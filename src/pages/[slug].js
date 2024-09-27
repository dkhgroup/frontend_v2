import { globalConfig } from "@/theme/globalConfig";
import { Stack, Container, Typography, Box } from "@mui/material";
import WestIcon from '@mui/icons-material/West';
import Link from "next/link";
import Grid from '@mui/material/Unstable_Grid2';

import { createMarkup, formatContent } from "@/components/createMarkup";
import SeoMetaTag from "@/components/pageConfig/meta";
import { cdnImage } from "@/components/ui/cdnImage";
import Toc from "@/components/pages/blog/toc";

import FsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";
import { getSourceImages } from "@/components/format/sourceImg";
import MainLayout from "@/layouts/main";
 
export async function getStaticProps({ params }) {

    const slug = params?.slug

    const res = await fetch(`${globalConfig.api_url}/blogs/?filters[slug][$eq]=${slug}&populate[0]=thumbnail&populate[1]=seo&populate[2]=seo.thumbnail&populate[3]=blog_category`)
    const posts = await res.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()
   
    return {
      props: {
        posts: posts.data[0],
        navbar,
        footer
      },
      revalidate: globalConfig.revalidateTime, // In seconds
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${globalConfig.api_url}/blogs`)
    const posts = await res.json()
   
    // Get the paths we want to pre-render based on posts
    const paths = posts?.data?.map((post) => ({
        params: { 
            slug: `${post.slug}`
        },
    }))
   
    return { paths, fallback: 'blocking' }
}

export default function BLogPost({
    posts,
    navbar,
    footer
}){
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const [contents,setContents] = useState('')

    useEffect(()=>{
        setContents(posts?.attributes?.content)
    },[])

    const content = posts?.attributes?.content
    const sources = getSourceImages(content)

    const handleClick = async (e) => {
        const el = e.target
        if (!el || el.tagName != "IMG") return
        const number = sources.findIndex(i => i == el.currentSrc)
        if (number < 0) return
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: +number + 1
        });
    }

    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title={posts?.attributes?.seo?.title || posts?.attributes?.title}
                description={posts?.attributes?.seo?.description || posts?.attributes?.description}
                thumbnail={
                    cdnImage(
                        posts?.attributes?.seo?.thumbnail?.data?.attributes?.url ||
                        posts?.attributes?.thumbnail?.data?.attributes?.url
                    )
                }
            />
            <Stack spacing={0}>
                <Box bgcolor={"#f8f8f8"}>
                    <Container maxWidth={globalConfig.maxWidth}>
                        <Stack py={8} spacing={2}>
                            <Link href={`/category/${posts?.attributes?.blog_category?.data?.attributes?.slug}`}>
                                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                    <WestIcon fontSize="15"/>
                                    <Typography variant="body2" fontWeight={500}>
                                        Quay lại trang {posts?.attributes?.blog_category?.data?.attributes?.name}
                                    </Typography>
                                </Stack>
                            </Link>
                            <Typography variant="h1" component={"h1"}>
                                {posts?.attributes?.title}
                            </Typography>
                        </Stack>
                    </Container>
                </Box>
                <Box py={5}>
                    <Container maxWidth={globalConfig.maxWidth}>
                        <Grid container spacing={2} justifyContent={"space-between"}>
                            <Grid xs={12} md={7}>
                                <Box className="post-content" onClick={handleClick}>
                                    <div dangerouslySetInnerHTML={createMarkup(formatContent(contents))} /> 
                                </Box>
                            </Grid>
                            <Grid xs={12} md={4}>
                                <Stack spacing={2} position={"sticky"} top={10} bottom={10} display={{xs: 'none',lg:'block'}}>
                                    <Typography variant="h2" component={"h2"} fontSize={22} fontWeight={700} color="secondary.main" letterSpacing={-1}>
                                        Mục lục
                                    </Typography>
                                    <Box component={"ul"} className="toc">
                                        <Toc contents={contents}/>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Stack>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={sources}
                slide={lightboxController.slide}
            /> 
        </MainLayout>
    )
}

