import { cdnImage } from "@/components/ui/cdnImage";
import { Box, Stack, Typography } from "@mui/material";

export default function AboutUsHeroSection({ post }) {
    return (
        <Box
            py={{
                xs: 10,
                md: 16
            }}
            sx={{
                backgroundImage: `url(${cdnImage(post?.data?.attributes?.thumbnail?.data?.attributes?.url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}
        >
            <Stack
                spacing={1}
                justifyContent={"center"}
                alignItems={"center"}
                position={'relative'}
                zIndex={1}
            >
                <Typography variant="h1" component={"h1"} fontSize={36} color={'#fff'} textAlign={"center"}>
                    {post?.data?.attributes?.title}
                </Typography>
                <Typography variant="body1" color="#fff">
                    {post?.data?.attributes?.description}
                </Typography>
            </Stack>
            <Box 
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                width={'100%'}
                height={'100%'}
                bgcolor={'rgb(0,0,0,0.5)'}
                zIndex={0}
            />
        </Box>
    )
}