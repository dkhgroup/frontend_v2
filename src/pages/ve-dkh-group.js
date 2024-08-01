import SeoMetaTag from "@/components/pageConfig/meta"
import AboutUsSection from "@/components/pages/about/about"
import ContactSection from "@/components/pages/about/contact"
import AboutUsHeroSection from "@/components/pages/about/hero"
import { cdnImage } from "@/components/ui/cdnImage"
import MainLayout from "@/layouts/main"
import { globalConfig } from "@/theme/globalConfig"

export default function AboutUsPage({ post,navbar,footer }) {
    return (
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title={post?.data?.attributes?.seo?.title || "DKH Group"}
                description={
                    post?.data?.attributes?.seo?.description ||
                    "DKH Group được thành lập với một mục đích rất rõ ràng: chúng tôi muốn mang đến cho thị trường những sản phẩm chất lượng cao về đồ da, thời trang và dược phẩm"
                }
                thumbnail={cdnImage(post?.data?.attributes?.seo?.thumbnail?.data?.attributes?.url)}
            />
            <AboutUsHeroSection post={post} />
            <AboutUsSection post={post} />
            <ContactSection post={post} />
        </MainLayout>
    )
}

export async function getStaticProps() {

    const urlNavbar = `${globalConfig.api_url}/menus/5?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()

    const url = `${globalConfig.api_url}/about?populate[0]=thumbnail&populate[1]=email&populate[2]=hotline&populate[3]=seo&populate[4]=seo.thumbnail`
    const getData = await fetch(url)

    const post = await getData.json()

    return {
        props: {
            post,
            navbar,
            footer
        },
        revalidate: globalConfig.revalidateTime,
    }
}