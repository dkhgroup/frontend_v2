import LoginForm from "@/components/auth/loginForm";
import SeoMetaTag from "@/components/pageConfig/meta";
import MainLayout from "@/layouts/main";
import { globalConfig } from "@/theme/globalConfig";
import { Container, Stack, Typography, Link } from "@mui/material";

export default function LoginPage({navbar,footer}){

    return(
        <MainLayout navbar={navbar} footer={footer}>
            <SeoMetaTag
                title="Đăng nhập | DKH Group"
                description={"Đăng nhập thành viên website DKH Group - Thương hiệu đồ da, dược phẩm hàng đầu Việt Nam"}
            />
            <Container maxWidth={"sm"}>
                <Stack spacing={3} my={8}>
                    <Stack spacing={1} >
                        <Typography variant="h1" component={"h1"} fontWeight={700} color="#222">
                            Đăng nhập
                        </Typography>
                        <Typography variant="body2">
                            Đăng nhập để không bỏ lỡ quyền lợi và kiểm tra các đơn hàng bạn đã đặt
                        </Typography>
                    </Stack>
                    <LoginForm />
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Link href="/register">
                            <Typography variant="body2" fontWeight={500} color="#0068FF">Đăng ký tài khoản mới</Typography>
                        </Link>
                        <Link href="/forgot-password">
                            <Typography variant="body2" fontWeight={500} color="#0068FF">Quên mật khẩu?</Typography>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
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