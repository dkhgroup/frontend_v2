import OrderTable from "@/components/pages/account/orders/table";
import SeoMetaTag from "@/components/pageConfig/meta";
import AccountLayout from "@/layouts/account";
import {Typography } from "@mui/material";

export default function HistoryOrderPage(){
    return(
        <>
            <SeoMetaTag
                title="Lịch sử đơn hàng"
            />
            <Typography mb={3} variant="h1" component={"h1"} fontSize={24} fontWeight={700} letterSpacing={-1.5}>
                Đơn hàng
            </Typography>

            <OrderTable />
        </>
    )
}

HistoryOrderPage.Layout = AccountLayout