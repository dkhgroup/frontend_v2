import { LoadingButton } from "@mui/lab"
import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2";
export default function LoadingCart() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2" component={"h2"} sx={styles.title}>
                Giỏ hàng
            </Typography>

            <Stack spacing={1}>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid xs={12} md={6} order={1}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Skeleton variant="rounded" width={60} height={60} />
                            <Stack spacing={1} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                <Box width={250}>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </Box>
                                <Skeleton variant="rounded" width={250} height={30} />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid xs={5} md={2.5} order={{xs: 3, md: 2}}>
                        <Skeleton variant="rounded" width={120} height={30} />
                    </Grid>
                    <Grid xs={5.5} md={2.6} order={{xs: 2, md: 3}}>
                        <Box width={150}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </Box>
                    </Grid>
                    <Grid xs={1} md={0.5} order={4}>
                        <Skeleton variant="rounded" width={20} height={20} />
                    </Grid>
                </Grid>
            </Stack>

            <Stack spacing={2} divider={<Divider light />}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1" fontWeight={500} textAlign={"left"}>
                        Tạm Tính
                    </Typography>
                    <Box width={150}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Box>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1" fontWeight={500} textAlign={"left"}>
                        Phí Ship
                    </Typography>
                    <Box width={150}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Box>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1" fontWeight={500} textAlign={"left"}>
                        Tổng
                    </Typography>
                    <Box width={150}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Box>
                </Stack>
            </Stack>
            <LoadingButton
                variant="contained"
                size="large"
                sx={{ py: 2 }}
                loading={true}
            >
                ĐẶT HÀNG NGAY
            </LoadingButton>
        </Stack>
    )
}

const styles = {
    title: {
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: -1,
        color: '#333333'
    }
}