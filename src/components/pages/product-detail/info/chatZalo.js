import { useContact } from "@/hooks/useContact";
import { Stack, Typography } from "@mui/material";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function ChatZaloOaBtn(){
    const {contact, isLoading} = useContact()

    if(isLoading) return
    
    return(
        <Link href={`https://zalo.me/${contact?.data?.attributes?.zalo_main}`}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
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
        </Link>
    )
}