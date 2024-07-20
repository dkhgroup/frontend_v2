import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button, Stack, Typography } from "@mui/material";
import { IconAddressBook, IconArrowNarrowRight, IconLogout, IconShoppingBagEdit, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function ButtonAccount(){

    const router = useRouter()
    const {logout} = useAuth()
    const {mutate} = useCart()

    const handleLogout = async () => {
        try {
            await logout()
            await mutate()
            router.push('/')
        } catch (error) {
            console.log("🚀 ~ handleLogout ~ error:", error)
        }
    }

    return(
        <Stack spacing={2}>
            <Button 
                variant="contained" 
                color={router.asPath === "/account" ? "secondary" : "grey"}
                size="large"
                onClick={() => router.push('/account')}
            >
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <IconUser size={18}/>
                        <Typography variant="body2" fontWeight={700}>
                            Thông tin tài khoản
                        </Typography>
                    </Stack>
                    <IconArrowNarrowRight />
                </Stack>
            </Button>
            <Button 
                variant="contained" 
                color={router.asPath === "/account/orders" ? "secondary" : "grey"}
                size="large"
                onClick={() => router.push('/account/orders')}
            >
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <IconShoppingBagEdit size={18}/>
                        <Typography variant="body2" fontWeight={700}>
                            Lịch sử đơn hàng
                        </Typography>
                    </Stack>
                    <IconArrowNarrowRight />
                </Stack>
            </Button>
            <Button 
                variant="contained" 
                color={router.asPath === "/account/address-books" ? "secondary" : "grey"}
                size="large"
                onClick={() => router.push('/account/address-books')}
            >
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <IconAddressBook size={18}/>
                        <Typography variant="body2" fontWeight={700}>
                            Sổ địa chỉ
                        </Typography>
                    </Stack>
                    <IconArrowNarrowRight />
                </Stack>
            </Button>
            <Button variant="contained" color="error" size="large" onClick={handleLogout}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <IconLogout size={18}/>
                        <Typography variant="body2" fontWeight={700}>
                            Đăng xuất
                        </Typography>
                    </Stack>
                    <IconArrowNarrowRight />
                </Stack>
            </Button>
        </Stack>
    )
}