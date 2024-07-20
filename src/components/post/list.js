import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function PostList({title,link,thumbnail,width,height,linkCat,category_title,date}){
    return(
        <Stack spacing={{xs: 0,md: 1.5}} direction={"row"} alignItems={"center"}>
            <Box sx={{
                display:{
                    xs: 'none',
                    md: 'block'
                },
                '& img': {
                    borderRadius: 1,
                    width:'80px',
                    height:'80px',
                    objectFit:"cover"
                }
            }}>
                <Link href={link}>
                    <Image
                        src={thumbnail}
                        width={width}
                        height={height}
                        alt={title}
                    />
                </Link>
            </Box>
            <Stack spacing={1}>
                <Stack direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />} justifyContent={"flex-start"} alignItems={"center"}>
                    <Link href={linkCat}>
                        <Typography variant="body2" fontSize={14} lineHeight={1}>
                            {category_title}
                        </Typography>
                    </Link>
                    <Typography variant="body2" fontSize={14} lineHeight={1}>
                        Ngày đăng: {date}
                    </Typography>
                </Stack>
                <Link href={link}>
                    <Typography variant="h3" component={"h3"} fontSize={18} fontWeight={700}>
                        {title}
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    )
}