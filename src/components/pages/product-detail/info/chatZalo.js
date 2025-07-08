import { Stack, Typography } from "@mui/material";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";

export default function ChatZaloOaBtn(){


    return(
        <a href="https://zalo.me/0962663459" target="_blank" rel="noopener noreferrer">
        <Stack 
            style={{cursor: "pointer"}}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
        >
            <Image
                src={'/assets/zalo-icon.svg'}
                width={20}
                height={20}
                alt="Zalo Icon"
            />
            <Typography variant="body2" fontWeight={500} letterSpacing={"-1px"} color="#0068FF">
                Chat để được DKHGroup tư vấn sản phẩm (08:30 - 20:30)
            </Typography>
            <IconArrowNarrowRight fontSize={15} color="#555555" />
        </Stack>
        </a>
    )
}