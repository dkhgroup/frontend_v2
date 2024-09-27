import { createMarkup } from "@/components/createMarkup"
import SeoMetaTag from "@/components/pageConfig/meta"
import ListPost from "@/components/pages/page/list"
import BreakCrumbDkh from "@/components/ui/breakcrumb"
import { cdnImage } from "@/components/ui/cdnImage"
import MainLayout from "@/layouts/main"
import { globalConfig } from "@/theme/globalConfig"
import { Box, Container, Stack, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

export default function StaticPage({
    posts,
    navbar,
    footer
}){
    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title={posts?.data?.attributes?.seo?.title || posts?.data?.attributes?.title}
                description={posts?.data?.attributes?.seo?.description || posts?.data?.attributes?.description}
                thumbnail={
                    cdnImage(
                        posts?.data?.attributes?.seo?.thumbnail?.data?.attributes?.url ||
                        posts?.data?.attributes?.thumbnail?.data?.attributes?.url
                    )
                }
            />
            <Box py={5} bgcolor={"#f8f8f8"}>
                <Container maxWidth={globalConfig.maxWidth}>
                    <Stack spacing={2}>
                        <BreakCrumbDkh 
                            loops={[{id: 1, text: 'Trang tĩnh', link: '/page'}]}
                            text={posts?.data?.attributes?.title}
                        />
                        <Typography
                            textTransform={"uppercase"} 
                            variant="h1" 
                            component={"h1"} 
                            fontSize={28} 
                            fontWeight={700}
                            color="primary.main"
                        >
                            {posts?.data?.attributes?.title}
                        </Typography>
                    </Stack>
                </Container>
            </Box>
            <Box py={5}>
                <Container maxWidth={globalConfig.maxWidth}>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid xs={12} md={8}>
                            <Box className="post-content">
                                <div dangerouslySetInnerHTML={createMarkup(posts?.data?.attributes?.content)} /> 
                            </Box>
                        </Grid>
                        <Grid xs={12} md={3}>
                            <ListPost />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </MainLayout>
    )
}

export async function getStaticProps({ params }) {
    const slug = params?.slug

    const id = slug.slice(slug.search('_id=') + 4)

    const res = await fetch(`${globalConfig.api_url}/static-pages/${id}??populate[0]=thumbnail&populate[1]=seo&populate[2]=seo.thumbnail`)
    const posts = await res.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()
   
    return {
      props: {
        posts,
        navbar,
        footer
      },
      revalidate: globalConfig.revalidateTime, // In seconds
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${globalConfig.api_url}/static-pages`)
    const posts = await res.json()
   
    // Get the paths we want to pre-render based on posts
    const paths = posts?.data?.map((post) => ({
        params: { 
            slug: `${post?.attributes?.slug}_id=${post.id}`,
        },
    }))
   
    return { paths, fallback: 'blocking' }
}