import SeoMetaTag from "@/components/pageConfig/meta";
import PostCategoryBreadCrumb from "@/components/post/breakcrumbs"
import LastPost from "@/components/post/lastPost";
import EmptyContent from "@/components/ui/empty";
import MainLayout from "@/layouts/main";
import { globalConfig } from "@/theme/globalConfig"
import { Stack, Container, Typography } from "@mui/material"

export default function TuyenDungPage({ posts,category,footer,navbar }){
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
                            <PostCategoryBreadCrumb link={'#'} title="Tuyển dụng" />
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
                    <Container maxWidth={globalConfig.maxWidth}>
                        {posts?.data?.length > 1 ?
                            <LastPost datas={posts?.data} hideTitle={true}/>
                        :
                            <EmptyContent title="Nội dung trống, vui lòng quay lại sau" width={350} height={233}/>
                        }
                    </Container>
                </Stack>
            </Stack>
        </MainLayout>
        
    )
}

export async function getStaticProps() {

    const categoryId = 4

    const res = await fetch(`${globalConfig.api_url}/blogs?populate=*&filters[blog_category][$eq]=${categoryId}&sort[0]=id:desc`)
    const posts = await res.json()

    const res2 = await fetch(`${globalConfig.api_url}/blog-categories/${categoryId}`)
    const category = await res2.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()
   
    return {
      props: {
        posts,
        category,
        navbar,
        footer
      },
      revalidate: 10, // In seconds
    }
}