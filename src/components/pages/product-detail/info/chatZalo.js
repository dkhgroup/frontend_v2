import { clickZaloBtnProductDetail } from "@/components/ga4";
import { useContact } from "@/hooks/useContact";
import { Button, Stack, Typography } from "@mui/material";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ChatZaloOaBtn(){
    const {contact, isLoading} = useContact()
    const router = useRouter()

    const handleClickOa = (zaloId) => {
        clickZaloBtnProductDetail()
        router.push(`https://zalo.me/${zaloId}`)
    }

    if(isLoading) return

    return(
        <Stack style={{cursor: "pointer"}} direction={"row"} alignItems={"center"} spacing={1} onClick={()=>handleClickOa(contact?.data?.attributes?.zalo_main)}>
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
    )
}