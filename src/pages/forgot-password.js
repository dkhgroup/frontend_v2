import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";
import FormOtp from "@/components/auth/otp";
import SetNewPasswordForm from "@/components/auth/setNewPassword";
import SeoMetaTag from "@/components/pageConfig/meta";
import { Container, Stack, Typography, Link } from "@mui/material";
import { useState } from "react";

export default function ForgotPasswordPage(){
    const [phoneNumber,setPhoneNumber] = useState()
    const [confirmationResult,setConfirmationResult] = useState()
    const [showForm,setShowForm] = useState(false)
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
                            Quên mật khẩu
                        </Typography>
                        <Typography variant="body2">
                            Để đặt lại mật khẩu cho tài khoản của bạn, vui lòng nhập thông tin theo form sau
                        </Typography>
                    </Stack>

                    {!showForm && !confirmationResult && <ForgotPasswordForm 
                        setPhoneNumber={setPhoneNumber}
                        setConfirmationResult={setConfirmationResult}
                    />}

                    {!showForm && confirmationResult &&
                        <FormOtp 
                            phoneNumber={phoneNumber}
                            confirmationResult={confirmationResult}
                            setShowForm={setShowForm}
                        />
                    }

                    {showForm && <SetNewPasswordForm phoneNumber={phoneNumber}/>}

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