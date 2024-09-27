import SeoMetaTag from "@/components/pageConfig/meta";
import MainLayout from "@/layouts/main";
import { globalConfig } from "@/theme/globalConfig";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function NotFoundPage({navbar,footer}) {
    return (
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="DKH Group Not Found"
                description="DKH Group không tìm thấy nội dung bạn đang truy cập"
            />
            <Container maxWidth={globalConfig.maxWidth}>
                <Stack minHeight={500} justifyContent={"center"} alignItems={"center"} spacing={2}>
                    <Image
                        src={'/assets/not-found.svg'}
                        width={350}
                        height={280}
                        alt="DKH Group Not Found"
                    />
                    <Typography variant="h1" component={"h1"} fontSize={18} fontWeight={700} textAlign={"center"}>
                        DKH Group Not Found
                    </Typography>
                    <Typography variant="body1" fontWeight={300} textAlign={"center"}>
                        Xin lỗi ! Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị xoá bởi admin, vui lòng Quay lại trang chủ để xem các nội dung khác
                    </Typography>
                </Stack>
            </Container>
        </MainLayout>
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