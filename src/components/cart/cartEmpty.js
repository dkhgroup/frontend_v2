import { Stack, Typography, Link } from "@mui/material";
import Image from "next/image";

export default function CartEmpty({
    width = 350,
    height = 350,
    showLink = true,
    text="Giỏ hàng trống"
}){
    return(
        <>
            <Stack justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} py={4} spacing={2}>
                <Image
                    src="/assets/cart-empty.svg"
                    width={width}
                    height={height}
                    alt="cart empty"
                />
                <Typography variant="h1" component={"h1"} textAlign={"center"} fontWeight={700} fontSize={20} color="primary.main">
                    {text}
                </Typography>

                {showLink && <Link href="/">Click vào đây để quay lại trang chủ</Link>}
            </Stack>
        </>
    )
}