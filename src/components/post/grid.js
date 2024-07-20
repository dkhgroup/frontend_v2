import { Box, Divider, Stack, Typography } from "@mui/material";
import { IconClockHour1, IconFolder } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function PostGrid({title,link,thumbnail,width,height,linkCat,category_title,date,description,imgHeight}){
    return(
        <Stack spacing={1.5} pb={2}>
            <Link href={link}>
                <Box 
                    className="blog-cat-thumbnail"
                    sx={{
                        '& img': {
                            borderRadius: 2,
                            width:'100%',
                            height: imgHeight || '200px',
                            objectFit: 'cover'
                        }
                    }}
                >
                        <Image
                            src={thumbnail || '/assets/post-thumbnail.jpg'}
                            width={width}
                            height={height}
                            alt={title}
                        />
                </Box>
            </Link>
            <Stack direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />} justifyContent={"flex-start"} alignItems={"center"}>
                <Link href={linkCat}>
                    <Stack direction={"row"} spacing={1}>
                        <IconFolder size={16}/>
                        <Typography variant="body2" fontSize={14} lineHeight={1}>
                            {category_title}
                        </Typography>
                    </Stack>
                </Link>
                <Stack direction={"row"} spacing={1}>
                    <IconClockHour1 size={16}/>
                    <Typography variant="body2" fontSize={14} lineHeight={1}>
                        {date}
                    </Typography>
                </Stack>
            </Stack>
            <Link href={link}>
                <Typography variant="h3" component={"h3"} fontSize={18} fontWeight={700}>
                    {title}
                </Typography>
            </Link>
            <Typography variant="body2">
                {description}
            </Typography>
        </Stack>
    )
}