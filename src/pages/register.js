import { Container, Stack, Typography, Link } from "@mui/material";
import RegisterForm from "@/components/auth/registerForm";
import SeoMetaTag from "@/components/pageConfig/meta";

export default function RegisterPage(){
    return(
        <>
            <SeoMetaTag
                title="Đăng ký thành viên | DKH Group"
                description={"Đăng ký thành viên website DKH Group - Thương hiệu đồ da, dược phẩm hàng đầu Việt Nam"}
            />
            <Container maxWidth={"sm"}>
                <Stack spacing={3} my={8}>
                    <Stack spacing={1} >
                        <Typography variant="h1" component={"h1"} fontWeight={700} color="#222">
                            Đăng ký
                        </Typography>
                        <Typography variant="body2">
                            Đăng nhập để không bỏ lỡ quyền lợi và kiểm tra các đơn hàng bạn đã đặt
                        </Typography>
                    </Stack>
                    <RegisterForm />
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Link href="/login">
                            <Typography variant="body2" fontWeight={500} color="#0068FF">Quay lại trang đăng nhập</Typography>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}