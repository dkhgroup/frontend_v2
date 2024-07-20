import { Box, Skeleton, Stack } from "@mui/material";

export default function LoadingProductGridItem({
    imgWidth,
    imgHeight
}){
    return(
        <Stack spacing={0} sx={{
            width: '100%',
            height: '100%',
            mb: 2,
            bgcolor: '#fff',
            borderRadius: 2
        }}>
            <Box>
                <Skeleton variant="rounded" width={imgWidth || 300} height={imgHeight || 300} />
            </Box>

            <Box sx={{
                bgcolor: '#fff',
            }}>

                <Stack spacing={0} mt={1}>
                    <Skeleton variant="text" sx={{ fontSize: '20px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                </Stack>

                <Stack direction={"row"} justifyContent="space-between" alignItems="center">
                    <Box width={"40%"}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Box>
                    <Box width={"40%"}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}