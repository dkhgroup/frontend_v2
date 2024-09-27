import InfoUserShowMode from "@/components/pages/account/info/infoUser";
import InfoUserEditMode from "@/components/pages/account/info/infoUserEdit";
import ChangePassword from "@/components/pages/account/info/password";
import SeoMetaTag from "@/components/pageConfig/meta";
import { useAuth } from "@/hooks/useAuth";
import AccountLayout from "@/layouts/account";
import {Typography } from "@mui/material";
import { useState } from "react";
import { globalConfig } from "@/theme/globalConfig";

export default function InfoAccountPage({navbar,footer}){

    const {userData} = useAuth()

    const [updateMode,setUpdateMode] = useState(false)

    return(
        <AccountLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="Thông tin tài khoản | DKH Group Website"
            />

            <Typography mb={3} variant="h1" component={"h1"} fontSize={24} fontWeight={700} letterSpacing={-1.5}>
                Thông tin tài khoản
            </Typography>

            {updateMode ? <InfoUserEditMode setUpdateMode={setUpdateMode} userData={userData} /> : <InfoUserShowMode setUpdateMode={setUpdateMode} userData={userData} />}

            <ChangePassword />
        </AccountLayout>
    )
}

export async function getStaticProps() {
  
    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
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