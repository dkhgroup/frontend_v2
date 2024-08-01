import SeoMetaTag from "@/components/pageConfig/meta"
import { useCart } from "@/hooks/useCart"
import { Button, Container, Stack, Typography } from "@mui/material"
import { IconArrowLeft, IconPrinter, IconRosetteDiscountCheckFilled } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import Grid from '@mui/material/Unstable_Grid2';
import ConsumerInfo from "@/components/pages/cart/success/consumerInfo"
import OrderInfo from "@/components/pages/cart/success/orderInfo"
import { useRouter } from "next/router"
import LoadingSection from "@/components/screen/loadingSection"
import { useOrderCheck } from "@/hooks/useOrderCheck"
import { globalConfig } from "@/theme/globalConfig"
import MainLayout from "@/layouts/main"
import EmptyContent from "@/components/ui/empty"

export default function SuccessOrderPage({
    navbar,
    footer
}){

    const router = useRouter()

    const {thisOrder,isLoading} = useOrderCheck(router?.query?.code)

    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="Đặt hàng thành công"
                description="Đặt hàng thành công tại DKH Group Website"
            />

            {isLoading && <LoadingSection />}

            {!isLoading && !thisOrder && <EmptyContent title="Nội dung không tồn tại. Vui lòng quay lại trang chủ hoặc liên hệ admin để biết thêm chi tiết" />}
            
            {!isLoading && thisOrder &&
                <Container maxWidth={'lg'}>
                    <Stack spacing={3} py={{xs:2,md:4}} id="print-area">
                        <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
                            <IconRosetteDiscountCheckFilled size={80} color="#0277bd"/>
                            <Typography variant="h1" component={"h1"} fontSize={28} fontWeight={700} color="#0277bd">
                                Đặt hàng thành công
                            </Typography>
                            <Typography textAlign={"center"}>
                                Cảm ơn Quý khách đã đặt hàng tại website DKH Group. Đơn hàng của Quý khách đã được ghi nhận thành công. Vui lòng kiểm tra thông tin chi tiết đơn hàng trong tin nhắn đã được chúng tôi gửi đến Zalo của Quý khách.
                            </Typography>

                            <Stack py={1} px={2} bgcolor={"#f2f2f2"} borderRadius={5}>
                                <Typography variant="body2" fontWeight={700}>
                                    Đơn hàng mã: {thisOrder?.order_code} - Trạng thái: {thisOrder?.status?.name}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Grid container spacing={4}>
                            <Grid xs={12} md={5}>
                                <ConsumerInfo data={thisOrder}/>
                            </Grid>
                            <Grid xs={12} md={7}>
                                <OrderInfo data={thisOrder}/>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Stack direction={{xs: "column", md: "row"}} spacing={2} mb={3} justifyContent={"space-between"} alignItems={"center"}>
                        <Button 
                            variant="contained"
                            onClick={() => router.push('/')}
                            startIcon={<IconArrowLeft size={18}/>}
                        >
                            Quay lại trang chủ
                        </Button>
                        <Button 
                            variant="contained"
                            onClick={() => window.print()}
                            startIcon={<IconPrinter size={18}/>}
                        >
                            In đơn hàng
                        </Button>
                    </Stack>
                </Container>
            }
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