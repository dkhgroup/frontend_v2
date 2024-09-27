import { globalConfig } from "@/theme/globalConfig";
import { Stack, Container, Typography, Box, NoSsr } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { createMarkup, formatContent } from "@/components/createMarkup";
import SeoMetaTag from "@/components/pageConfig/meta";
import { cdnImage } from "@/components/ui/cdnImage";
import Toc from "@/components/pages/blog/toc";
import BreakCrumbDkh from "@/components/ui/breakcrumb";
import MainLayout from "@/layouts/main";
import EmptyContent from "@/components/ui/empty";

export async function getStaticProps() {
    const res = await fetch(`${globalConfig.api_url}/static-pages/?filters[slug][$eq]=chinh-sach-bao-hanh&populate[0]=thumbnail&populate[1]=seo&populate[2]=seo.thumbnail&populate[3]=blog_category`)
    const posts = await res.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()

    return {
        props: {
          posts: posts?.data,
          navbar,
          footer
        },
        revalidate: globalConfig.revalidateTime, // In seconds
    }
}

export default function Dieukhoan({
    posts,
    navbar,
    footer
}){

    const data = posts?.[0]

    const contentHtml = formatContent(data?.attributes?.content)

    return(
        <MainLayout posts={data} footer={footer} navbar={navbar}>
            <SeoMetaTag
                title={data?.attributes?.seo?.title || data?.attributes?.title}
                description={data?.attributes?.seo?.description || data?.attributes?.description}
                thumbnail={
                    cdnImage(
                        data?.attributes?.seo?.thumbnail?.data?.attributes?.url ||
                        data?.attributes?.thumbnail?.data?.attributes?.url
                    )
                }
            />
            {data ?
                <Stack spacing={0}>

                    <Box py={5} bgcolor={"#f8f8f8"}>
                        <Container maxWidth={globalConfig.maxWidth}>
                            <Stack spacing={2}>
                                <BreakCrumbDkh 
                                    loops={[]}
                                    text={data?.attributes?.title}
                                />
                                <Typography
                                    textTransform={"uppercase"} 
                                    variant="h1" 
                                    component={"h1"} 
                                    fontSize={28} 
                                    fontWeight={700}
                                    color="primary.main"
                                >
                                    {data?.attributes?.title}
                                </Typography>
                            </Stack>
                        </Container>
                    </Box>
                    <Box py={5}>
                        <Container maxWidth={globalConfig.maxWidth}>
                            <Grid container spacing={2} justifyContent={"space-between"}>
                                <Grid xs={12} md={7}>
                                    <NoSsr>
                                        <Box className="post-content">
                                            <div dangerouslySetInnerHTML={createMarkup(contentHtml)} /> 
                                        </Box>
                                    </NoSsr>
                                </Grid>
                                <Grid xs={12} md={4}>
                                    <Stack spacing={2} position={"sticky"} top={10} bottom={10} display={{xs: 'none',lg:'block'}}>
                                        <Typography variant="h2" component={"h2"} fontSize={22} fontWeight={700} color="secondary.main" letterSpacing={-1}>
                                            Mục lục
                                        </Typography>
                                        <Box component={"ul"} className="toc">
                                            <Toc contents={contentHtml}/>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Stack>
            :
                <EmptyContent title="Nội dung không tồn tại hoặc đã bị xoá bởi admin"/>
            }
        </MainLayout>
    )
}