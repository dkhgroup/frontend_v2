import { Box, Button, Container, Stack, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Image from "next/image";
import { useRouter } from "next/router";
import { cdnImage } from "@/components/ui/cdnImage";
import { calcHeight } from "@/components/format/calcHeight";

export default function DefaultSlide({
    maxWidth = "lg",
    title="",
    excerpt="",
    description="",
    detailBtn=true,
    url=null,
    width=380,
    height=380,
    link="#"
}){
    
    const router = useRouter()

    return(
        <Container maxWidth={maxWidth}>
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} sx={{py: {xs:3,md:8}}}>
                <Grid xs={12} md={6}>
                    <Stack spacing={0.5}>
                        <Typography variant="h3" component={"h3"} fontSize={36} fontWeight={600} color={"primary.main"} letterSpacing={"-2px"}>
                            {title}
                        </Typography>
                        <Typography fontSize={18} letterSpacing={3} fontWeight={500} color="#555">
                            {excerpt}
                        </Typography>
                    </Stack>
                    <Box maxWidth={680} my={3}>
                        <Typography fontSize={16} fontWeight={300} letterSpacing={2}>
                            {description}
                        </Typography>
                    </Box>
                    {detailBtn && <Button variant="outlined" endIcon={<ArrowRightAltIcon />} sx={{ borderRadius: 2 }} color="secondary" onClick={() => router.push(link)}>Xem chi tiết</Button>}
                </Grid>
                <Grid xs={12} md={1} />
                <Grid xs={12} md={5}>
                    <Stack position={"relative"} maxWidth={"100%"} maxHeight={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Box sx={styles.circle} />
                        <Box sx={styles.thumbnail}>
                            <Image
                                src={cdnImage(url, "/assets/default-product-thumbnail.png")}
                                width={width}
                                height={height}
                                alt="slide"
                            />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

const styles = {
    circle: {
        width: {
            xs: '95vw',
            lg: 400
        },
        height: {
            xs: '95vw',
            lg: 400
        },
        borderRadius: 360,
        zIndex: 1,
        bgcolor: '#dcdcdc',
        opacity: 0.8
    },
    thumbnail: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            width: {
                xs: '90vw',
                lg: '70%'
            },
            height: 'auto'
        }
    }
}