import SeoMetaTag from "@/components/pageConfig/meta"
import BreakCrumbDkh from "@/components/ui/breakcrumb"
import { cdnImage } from "@/components/ui/cdnImage"
import MainLayout from "@/layouts/main"
import { globalConfig } from "@/theme/globalConfig"
import { Box, Container, Divider, Stack, Typography } from "@mui/material"
import Link from "next/link"

export default function StaticPage({posts,navbar,footer}){
    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="Hướng dẫn sử dụng các sản phẩm DKHGroup"
                description="Hướng dẫn sử dụng các sản phẩm DKHGroup"
                thumbnail={cdnImage()}
                url={`/docs`}
            />
            <Stack spacing={0}>
                <Box py={5} bgcolor={"#f8f8f8"}>
                    <Container maxWidth={globalConfig.maxWidth}>
                        <Stack spacing={2}>
                            <BreakCrumbDkh text="Các trang tĩnh" />
                            <Typography 
                                textTransform={"uppercase"} 
                                variant="h1" 
                                component={"h1"} 
                                fontSize={30} 
                                fontWeight={700}
                                color="primary.main"
                            >
                                Tài liệu hướng dẫn sử dụng các sản phẩm DKHGroup
                            </Typography>
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth={globalConfig.maxWidth}>
                    <Stack py={5} spacing={3} divider={<Divider />}>
                        {posts && posts?.data?.map(item =>
                            <Stack spacing={2} key={item.id}>
                                <Link
                                    href={`/docs/${item?.attributes?.slug}_id=${item.id}`} 
                                    key={item.id}
                                >
                                    <Typography 
                                        variant="h2" 
                                        component={"h2"}
                                        fontSize={20}
                                        fontWeight={700}
                                        color="secondary.main"
                                    >
                                        {item?.attributes?.title}
                                    </Typography>
                                </Link>
                                <Typography variant="body1">
                                    {item?.attributes?.description}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Stack>
        </MainLayout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${globalConfig.api_url}/docs`)
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