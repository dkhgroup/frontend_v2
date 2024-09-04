import { cdnImage } from "@/components/ui/cdnImage";
import { Box, Stack, Typography, Link } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import { calcHeight } from "@/components/format/calcHeight";

export default function FooterCopyRight({contact}){

    return(
        <Box component={"section"} py={4}>
            <Grid 
                container 
                spacing={5} 
                justifyContent={"center"} 
                alignItems={"center"}
            >
                <Grid xs={12} md={8}>
                    <Typography variant="body1" color={"#fff"} fontWeight={700}>
                        {contact?.data?.attributes?.company_name || ""}
                    </Typography>
                    <Typography variant="body2" color={"#fff"}>
                        {contact?.data?.attributes?.info_company || ""}
                    </Typography>
                </Grid>
                <Grid xs={12} md={4}>
                    <Stack 
                        direction={"row"} 
                        spacing={2} 
                        justifyContent={"center"} 
                        alignItems={"center"}
                    >
                        {contact && contact?.data?.attributes?.img_copyright?.map(item => 
                            <Link href={item.link} key={item.id}>
                                <Image
                                    src={cdnImage(item?.image?.data?.attributes?.url,'/assets/ncsc.png')}
                                    width={calcHeight(
                                        item?.image?.data?.attributes?.height,
                                        item?.image?.data?.attributes?.width,
                                        48
                                    )}
                                    height={48}
                                    alt="Tín nhiệm mạng - DKH Group"
                                />
                            </Link>
                        )}
                    </Stack>
                </Grid>  
            </Grid>
        </Box>
    )
}