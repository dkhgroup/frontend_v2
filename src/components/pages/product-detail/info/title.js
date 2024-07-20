import { Stack, Typography } from "@mui/material";

export default function ProductDetailTitle({data}){
    return(
        <Stack spacing={0.5}>
            <Typography variant="h1" component={"h1"} fontSize={{xs: 22,md: 30}} fontWeight={700} lineHeight={1.3} letterSpacing={-1}>
                {data?.name || ""}
            </Typography>
            <Typography variant="body2">
                {data?.expert || ""}
            </Typography>
        </Stack>
    )
}