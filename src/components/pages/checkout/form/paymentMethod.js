import { Stack, Typography } from "@mui/material";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";

export default function PaymentMethod(){
    return(
        <Stack 
            direction={"row"} 
            alignItems={"center"} 
            spacing={2}
            sx={{
                border: '1px solid #888',
                p: 2,
                borderRadius: 4
            }}
        >
            <IconCircleCheckFilled size={24} color="#00DA4A" />
            <Image
                src="/assets/cod_icon.svg"
                width={56}
                height={23}
                alt="cod icon"
            />
            <Stack spacing={0}>
                <Typography variant="h3" component={"h3"} fontSize={18} fontWeight={500}>
                    COD
                </Typography>
                <Typography variant="body2" color="#666">
                    Thanh toán khi nhận hàng
                </Typography>
            </Stack>
        </Stack>
    )
}