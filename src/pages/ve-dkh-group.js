import SeoMetaTag from "@/components/pageConfig/meta"
import AboutUsSection from "@/components/pages/about/about"
import ContactSection from "@/components/pages/about/contact"
import AboutUsHeroSection from "@/components/pages/about/hero"
import { cdnImage } from "@/components/ui/cdnImage"
import { globalConfig } from "@/theme/globalConfig"

export default function AboutUsPage({post}){
    return(
        <>
            <SeoMetaTag
                title={post?.data?.attributes?.seo?.title || "DKH Group"}
                description={
                    post?.data?.attributes?.seo?.description ||
                    "DKH Group được thành lập với một mục đích rất rõ ràng: chúng tôi muốn mang đến cho thị trường những sản phẩm chất lượng cao về đồ da, thời trang và dược phẩm"
                }
                thumbnail={cdnImage(post?.data?.attributes?.seo?.thumbnail?.data?.attributes?.url)}
            />
            <AboutUsHeroSection post={post}/>
            <AboutUsSection post={post} />
            <ContactSection post={post} />
        </>
    )
}

export async function getStaticProps() {

    const url = `${globalConfig.api_url}/about?populate[0]=thumbnail&populate[1]=email&populate[2]=hotline&populate[3]=seo&populate[4]=seo.thumbnail`
    const getData = await fetch(url)

    const post = await getData.json()

    return {
        props: {
          post,
        },
        revalidate: globalConfig.revalidateTime,
    }
}