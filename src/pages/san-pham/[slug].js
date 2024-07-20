import { viewItemEvent } from "@/components/ga4"
import SeoMetaTag from "@/components/pageConfig/meta"
import BreakCrumbProductDetail from "@/components/pages/product-detail/breakcrumb"
import ProductDetailContent from "@/components/pages/product-detail/content"
import InfoProductDetail from "@/components/pages/product-detail/info"
import { cdnImage } from "@/components/ui/cdnImage"
import { globalConfig } from "@/theme/globalConfig"
import { Stack } from "@mui/material"
import { useEffect, useRef } from "react"

export default function ProductDetailPage({data}){

    const initialized = useRef(false)
    
    useEffect(()=>{
        if (!initialized.current) {
            initialized.current = true
            viewItemEvent(data)
        }
    },[])

    return(
        <>
            <SeoMetaTag
                title={data?.seo?.title || data?.name}
                description={data?.seo?.description || data?.description}
                thumbnail={
                    cdnImage(
                        data?.seo?.thumbnail?.url ||
                        data?.thumbnail?.url
                    )
                }
            />
            <Stack spacing={0}>
                <BreakCrumbProductDetail data={data}/>
                <InfoProductDetail data={data} />
                <ProductDetailContent data={data} />
            </Stack>
        </>
    )
}

export async function getStaticProps({ params }) {

    const slug = params?.slug

    const res = await fetch(`${globalConfig.api_url}/dkh-products/${slug}`)
    const data = await res.json()

    return {
      props: {
        data,
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