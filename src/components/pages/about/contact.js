import { globalConfig } from "@/theme/globalConfig";
import { Container, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { IconMailForward, IconMapPin, IconPhoneCall } from "@tabler/icons-react";
import Link from "next/link";
export default function ContactSection({post}){

    return (
        <Container maxWidth={globalConfig.maxWidth}>
            <Stack justifyContent={"center"} alignItems={"center"} py={3} bgcolor={'#f2f2f2'} spacing={1} borderRadius={2} mb={2}>
                <Typography variant="h2" component={"h2"} fontSize={24} fontWeight={700}>
                    {post?.data?.attributes?.title_contact}
                </Typography>
                <Typography>
                    {post?.data?.attributes?.decription_contact}
                </Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Stack justifyContent={"center"} alignItems={"center"} spacing={1} p={2}>
                        <IconMapPin size={50} color="#666"/>
                        <Typography variant="h4" component={"h4"} fontSize={18} fontWeight={700} color="#333">
                            {post?.data?.attributes?.title_address}
                        </Typography>
                        <Typography textAlign={"center"}>
                            {post?.data?.attributes?.address}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                    <Stack justifyContent={"center"} alignItems={"center"} spacing={1} p={2}>
                        <IconPhoneCall size={50} color="#666"/>
                        <Typography variant="h4" component={"h4"} fontSize={18} fontWeight={700} color="#333">
                            {post?.data?.attributes?.title_hotline}
                        </Typography>
                        {post?.data?.attributes?.hotline?.length > 0 && post?.data?.attributes?.hotline?.map(item =>
                            <Stack direction={"row"} alignItems={"center"} key={item.id} spacing={1}>
                                <Link href={`tel:${item.phone}`} >
                                    <Typography fontWeight={700} color="primary.main">{item.phone}</Typography>
                                </Link>
                                <Typography>{item.text}</Typography>
                            </Stack>
                        )}
                    </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                    <Stack justifyContent={"center"} alignItems={"center"} spacing={1} p={2}>
                        <IconMailForward size={50} color="#666"/>
                        <Typography variant="h4" component={"h4"} fontSize={18} fontWeight={700} color="#333">
                            {post?.data?.attributes?.title_email}
                        </Typography>
                        
                        {post?.data?.attributes?.email?.length > 0 && post?.data?.attributes?.email?.map(item =>
                            <Link href={`mailto:${item.email}`} key={item.id}>
                                <Typography>{item.email}</Typography>
                            </Link>
                        )}
                    </Stack>
                </Grid>
            </Grid>

            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.4987763405643!2d105.75534687456975!3d20.972634389705277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345373b45a17e7%3A0x4ccf56c0a5e671a0!2sDKH%20Group%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1714483211251!5m2!1svi!2s" 
                width="100%" 
                height="450" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                frameborder="0"
            />

        </Container>
    )
}