import SeoMetaTag from "@/components/pageConfig/meta"
import BreakCrumbDkh from "@/components/ui/breakcrumb"
import { cdnImage } from "@/components/ui/cdnImage"
import { globalConfig } from "@/theme/globalConfig"
import { Box, Container, Divider, Stack, Typography } from "@mui/material"
import Link from "next/link"

export default function StaticPage({posts}){
    return(
        <>
            <SeoMetaTag
                title="Hướng dẫn sử dụng các sản phẩm DKHGroup"
                description="Hướng dẫn sử dụng các sản phẩm DKHGroup"
                thumbnail={cdnImage()}
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
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${globalConfig.api_url}/docs`)
    const posts = await res.json()
   
    return {
      props: {
        posts,
      },
      revalidate: globalConfig.revalidateTime, // In seconds
    }
}