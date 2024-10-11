import { viewContentFBEvent } from "@/components/capi/event"
import { viewItemEvent } from "@/components/ga4"
import SeoMetaTag from "@/components/pageConfig/meta"
import BreakCrumbProductDetail from "@/components/pages/product-detail/breakcrumb"
import ProductDetailContent from "@/components/pages/product-detail/content"
import InfoProductDetail from "@/components/pages/product-detail/info"
import { cdnImage } from "@/components/ui/cdnImage"
import MainLayout from "@/layouts/main"
import { globalConfig } from "@/theme/globalConfig"
import { Stack } from "@mui/material"
import { useEffect, useRef } from "react"

export default function ProductDetailPage({
    data,
    navbar,
    footer
}){

    const initialized = useRef(false)
    
    useEffect(()=>{
        if (!initialized.current) {
            initialized.current = true

            // ga4 view content
            viewItemEvent(data)

            // fb view content
            viewContentFBEvent(data)
        }
    },[])

    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title={data?.seo?.title || data?.name}
                description={data?.seo?.description || data?.description}
                thumbnail={
                    cdnImage(
                        data?.seo?.thumbnail?.url ||
                        data?.thumbnail?.url
                    )
                }
                url={`/san-pham/${data?.slug}`}
            />
            <Stack spacing={0}>
                <BreakCrumbProductDetail data={data}/>
                <InfoProductDetail data={data} />
                <ProductDetailContent data={data} />
            </Stack>
        </MainLayout>
    )
}

export async function getStaticProps({ params }) {

    const slug = params?.slug

    const res = await fetch(`${globalConfig.api_url}/dkh-products/${slug}`)
    const data = await res.json()

    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()

    return {
      props: {
        data,
        navbar,
        footer
      },
      revalidate: globalConfig.revalidateTime, // In seconds
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${globalConfig.api_url}/products`)
    const posts = await res.json()
   
    // Get the paths we want to pre-render based on posts
    const paths = posts?.data?.map((post) => ({
        params: { 
            slug: post.attributes.slug
        },
    }))
   
    return { paths, fallback: 'blocking' }
}