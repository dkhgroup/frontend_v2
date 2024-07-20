import { Box, Skeleton } from "@mui/material";

export default function LoadingText({
    minWidth=200,
    bgcolor = 'rgb(255,255,255,0.3)',
    fontSize = '1rem'
}){
    return(
        <Box minWidth={minWidth}>
            <Skeleton animation="wave" variant="text" sx={{ fontSize: fontSize, bgcolor: bgcolor }} />
        </Box>
    )
}