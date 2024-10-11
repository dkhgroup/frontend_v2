import SeoMetaTag from "@/components/pageConfig/meta";
import PostCategoryBreadCrumb from "@/components/post/breakcrumbs"
import LastPost from "@/components/post/lastPost";
import EmptyContent from "@/components/ui/empty";
import MainLayout from "@/layouts/main";
import { globalConfig } from "@/theme/globalConfig"
import { Stack, Container, Typography, Box } from "@mui/material"

export default function PostSlug({ 
    blogCategory,
    navbar,
    footer,
    posts
 }){
    const data = blogCategory?.data?.[0]?.attributes

    return(
        <MainLayout footer={footer} navbar={navbar}>
            <SeoMetaTag
                title={data?.name}
                description={data?.description}
                url={data?.slug}
            />

            <Stack spacing={0}>
                <Stack spacing={0} py={4} bgcolor={"#F8F8F8"}>
                    <Container maxWidth={globalConfig.maxWidth}>
                        <Stack spacing={2}>
                            <PostCategoryBreadCrumb link={'#'} title="Tin tức - Thông cáo báo chí" />
                            <Stack spacing={1}>
                                <Typography variant="h1" component={"h1"} fontWeight={700} fontSize={38} lineHeight={1.2} letterSpacing={-2} color="secondary.main">
                                    {data?.name}
                                </Typography>
                                <Typography variant="body2">
                                    {data?.description}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Container>
                </Stack>
                <Container maxWidth={globalConfig.maxWidth}>
                    {posts?.data?.length > 1 ?
                        <LastPost datas={posts?.data} hideTitle={true}/>
                    :
                        <EmptyContent title="Nội dung trống, vui lòng quay lại sau" width={350} height={233}/>
                    }
                </Container>
            </Stack>
        </MainLayout>
        
    )
}

export async function getStaticProps({ params }) {
    
    const slug = params?.slug

    const url = `${globalConfig.api_url}/blog-categories/?filters[slug][$eq]=${slug}`

    const res = await fetch(url)

    const blogCategory = await res.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()

    const res1 = await fetch(`${globalConfig.api_url}/blogs?populate=*&filters[blog_category][$eq]=${blogCategory?.data?.[0]?.id}&sort[0]=id:desc`)
    const posts = await res1.json()
   
    return {
      props: {
        blogCategory,
        navbar,
        footer,
        posts
      },
      revalidate: globalConfig.revalidateTime, // In seconds
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${globalConfig.api_url}/blog-categories`)
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts?.data?.map((post) => ({
        params: { 
            slug: `${post?.attributes?.slug}`
        },
    }))
    return { paths, fallback: 'blocking' }
}