import InfoUserShowMode from "@/components/pages/account/info/infoUser";
import InfoUserEditMode from "@/components/pages/account/info/infoUserEdit";
import ChangePassword from "@/components/pages/account/info/password";
import SeoMetaTag from "@/components/pageConfig/meta";
import { useAuth } from "@/hooks/useAuth";
import AccountLayout from "@/layouts/account";
import {Typography } from "@mui/material";
import { useState } from "react";

export default function InfoAccountPage(){

    const {userData} = useAuth()

    const [updateMode,setUpdateMode] = useState(false)

    return(
        <>
            <SeoMetaTag
                title="Thông tin tài khoản | DKH Group Website"
            />

            <Typography mb={3} variant="h1" component={"h1"} fontSize={24} fontWeight={700} letterSpacing={-1.5}>
                Thông tin tài khoản
            </Typography>

            {updateMode ? <InfoUserEditMode setUpdateMode={setUpdateMode} userData={userData} /> : <InfoUserShowMode setUpdateMode={setUpdateMode} userData={userData} />}

            <ChangePassword />
        </>
    )
}

InfoAccountPage.Layout = AccountLayout