import OrderTable from "@/components/pages/account/orders/table";
import SeoMetaTag from "@/components/pageConfig/meta";
import AccountLayout from "@/layouts/account";
import {Typography } from "@mui/material";
import { globalConfig } from "@/theme/globalConfig";

export default function HistoryOrderPage({
    navbar,
    footer
}){
    return(
        <AccountLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="Lịch sử đơn hàng"
            />
            <Typography mb={3} variant="h1" component={"h1"} fontSize={24} fontWeight={700} letterSpacing={-1.5}>
                Đơn hàng
            </Typography>

            <OrderTable />
        </AccountLayout>
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