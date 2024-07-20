import LoginForm from "@/components/auth/loginForm";
import SeoMetaTag from "@/components/pageConfig/meta";
import { Container, Stack, Typography, Link } from "@mui/material";

export default function LoginPage(){

    return(
        <>
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
        </>
    )
}