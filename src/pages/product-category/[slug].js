import { calcHeight } from "@/components/format/calcHeight"
import SeoMetaTag from "@/components/pageConfig/meta"
import ListProductCategory from "@/components/pages/product-category"
import DefaultSlide from "@/components/slide/default"
import { cdnImage } from "@/components/ui/cdnImage"
import MainLayout from "@/layouts/main"
import { convertPopulateParams } from "@/params/convert"
import { productCategoryParams } from "@/params/products"
import { globalConfig } from "@/theme/globalConfig"
import { Box, Stack } from "@mui/material"

export default function CollectionProductPage({
    productCategory,
    navbar,
    footer
}){
    
    const data = productCategory?.data[0]?.attributes

    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title={data?.seo?.title || data?.name}
                description={data?.seo?.description || data?.description}
                thumbnail={
                    cdnImage(
                        data?.seo?.thumbnail?.data?.attributes?.url ||
                        data?.thumbnail?.data?.attributes?.url
                    )
                }
            />
            <Stack spacing={0}>
                <Box bgcolor={"#f2f2f2"}>
                    <DefaultSlide
                        maxWidth="lg"
                        title={data?.name}
                        excerpt=""
                        description={data?.description}
                        detailBtn={false}
                        width={380}
                        height={calcHeight(
                            data?.thumbnail_hero?.data?.attributes?.width,
                            data?.thumbnail_hero?.data?.attributes?.height,
                            380
                        )}
                        url={data?.thumbnail_hero?.data?.attributes?.url}
                    />
                </Box>
                <ListProductCategory id={productCategory?.data[0]?.id} />
            </Stack> 
        </MainLayout>
    )
}

export async function getStaticProps({ params }) {
    
    const slug = params?.slug

    const url = `${globalConfig.api_url}/product-categories/?${convertPopulateParams(productCategoryParams)}&filters[slug][$eq]=${slug}`

    const res = await fetch(url)

    const productCategory = await res.json()

    const urlNavbar = `${globalConfig.api_url}/menus/5?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()
   
    return {
      props: {
        productCategory,
        navbar,
        footer
      },
      revalidate: globalConfig.revalidateTime, // In seconds
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${globalConfig.api_url}/product-categories`)
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts?.data?.map((post) => ({
        params: { 
            slug: `${post?.attributes?.slug}`
        },
    }))
    return { paths, fallback: 'blocking' }
}