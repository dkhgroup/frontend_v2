import LoadingText from "@/components/screen/loadingText";
import { useContact } from "@/hooks/useContact";
import { Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function FooterAboutUsSection2(){

    const {contact, isLoading} = useContact()

    if(isLoading) return

    return(
        <Stack spacing={1}>
            <Stack 
                direction={"row"} 
                spacing={2} 
                alignItems={"center"} 
                justifyContent={"flex-start"}
            >
                <Image
                    src={'/assets/phone.svg'}
                    width={24}
                    height={24}
                    alt="phone icon"
                />
                <Stack spacing={0}>
                    <Typography variant="body2" component={"span"} color="#fff">
                        Hotline
                    </Typography>
                    {!contact && <LoadingText />}
                    {contact && contact?.data?.attributes?.Hotline?.map(item =>
                        <Link href={`tel:${item?.phone}`} key={item.id}>
                            <Typography fontWeight={700} color="#fff">
                                {item?.phone} - {item?.text}
                            </Typography>
                        </Link>
                    )}
                </Stack>
            </Stack>
            <Stack 
                direction={"row"} 
                spacing={2} 
                alignItems={"center"} 
                justifyContent={"flex-start"}
            >
                <Image
                    src={'/assets/email.svg'}
                    width={24}
                    height={24}
                    alt="phone icon"
                />
                <Stack spacing={0}>
                    <Typography variant="body2" component={"span"} color="#fff">
                        Email
                    </Typography>
                    {!contact && <LoadingText />}
                    {contact && contact?.data?.attributes?.Email?.map(item =>
                        <Link href={`mailto:${item.email}`} key={item.id}>
                            <Typography fontWeight={700} color="#fff">
                                {item.email}
                            </Typography>
                        </Link>
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}