import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function EmptyContent({title,width=500,height=333}){
    return(
        <Stack justifyContent={"center"} alignItems={"center"} py={5}>
            <Image
                src="/assets/not-found.svg"
                width={width}
                height={height}
                alt="search not found"
            />
            <Typography variant="body1" fontWeight={300} fontSize={16}>
                {title}
            </Typography>
        </Stack>
    )
}