import SeoMetaTag from "@/components/pageConfig/meta";
import PostCategoryBreadCrumb from "@/components/post/breakcrumbs"
import FeaturedPost from "@/components/post/featuredPost";
import LastPost from "@/components/post/lastPost";
import MostViewPost from "@/components/post/mostViewPost";
import MainLayout from "@/layouts/main";
import { globalConfig } from "@/theme/globalConfig"
import { Stack, Container, Typography, Box } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

export default function TinTucPage({ posts, featured,mostview,category,footer,navbar }){

    return(
        <MainLayout footer={footer} navbar={navbar}>
            <SeoMetaTag
                title={category?.data?.attributes?.name}
                description={category?.data?.attributes?.description}
            />

            <Stack spacing={0}>
                <Stack spacing={0} py={4} bgcolor={"#F8F8F8"}>
                    <Container maxWidth={globalConfig.maxWidth}>
                        <Stack spacing={2}>
                            <PostCategoryBreadCrumb link={'#'} title="Tin tức - Thông cáo báo chí" />
                            <Stack spacing={1}>
                                <Typography variant="h1" component={"h1"} fontWeight={700} fontSize={38} lineHeight={1.2} letterSpacing={-2} color="secondary.main">
                                    {category?.data?.attributes?.name}
                                </Typography>
                                <Typography variant="body2">
                                    {category?.data?.attributes?.description}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Container>
                </Stack>
                <Stack py={3} spacing={{xs:0,md:5}}>
                    {featured?.data?.length > 1  &&
                        <Box 
                            display={{xs:'none',md:'block'}}
                        >
                            <Container maxWidth={globalConfig.maxWidth}>
                                <Grid container spacing={2} justifyContent={"space-between"}>
                                    <Grid xs={12} lg={5}>
                                        <FeaturedPost datas={featured?.data}/>
                                    </Grid>
                                    <Grid xs={12} lg={6.5}>
                                        <MostViewPost datas={mostview?.data}/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    }

                    <Box>
                        <Container maxWidth={globalConfig.maxWidth}>
                            <LastPost datas={posts?.data}/>
                        </Container>
                    </Box>

                </Stack>
            </Stack>
        </MainLayout>
        
    )
}

export async function getStaticProps() {

    const blogId = 3

    const res = await fetch(`${globalConfig.api_url}/blogs?populate=*&filters[blog_category][$eq]=${blogId}&sort[0]=id:desc`)
    const posts = await res.json()

    const res1 = await fetch(`${globalConfig.api_url}/blogs?populate=*&filters[featured][$eq]=true&pagination[limit]=1&sort[0]=id:desc`)
    const featured = await res1.json()

    const res2 = await fetch(`${globalConfig.api_url}/blogs?populate=*&filters[most_view][$eq]=true&pagination[limit]=4&sort[0]=id:desc`)
    const mostview = await res2.json()

    const res3 = await fetch(`${globalConfig.api_url}/blog-categories/${blogId}`)
    const category = await res3.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()
   
    return {
      props: {
        posts,
        featured,
        mostview,
        category,
        navbar,
        footer
      },
      revalidate: 10, // In seconds
    }
}