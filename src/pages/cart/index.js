import { initiateCheckoutFBEvent } from "@/components/capi/event";
import { beginCheckoutEvent } from "@/components/ga4";
import SeoMetaTag from "@/components/pageConfig/meta";
import CheckOutform from "@/components/pages/cart";
import { useCart } from "@/hooks/useCart";
import MainLayout from "@/layouts/main";
import { globalConfig } from "@/theme/globalConfig";
import { useEffect } from "react";

export default function CheckOutPage({
    navbar,
    footer
}) {

    const {cart} = useCart()

    useEffect(()=>{
        return () => {
            if(!cart) return
            beginCheckoutEvent(cart)
            initiateCheckoutFBEvent(cart)
        }
    },[cart])

    return (
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="Đặt đơn hàng | DKH Group"
                description="Form đặt hàng trên website DKH Group Việt Nam"
            />

            <CheckOutform />
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

   
    return {
      props: {
        navbar,
        footer
      },
      revalidate: globalConfig.revalidateTime,
    }
}