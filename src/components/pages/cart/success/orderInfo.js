import FormatCurrency from "@/components/format/money";
import { Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export default function OrderInfo({ data }) {

    return (
        <>
            <Stack 
                mb={1} 
                justifyContent={"center"} 
                alignItems={"center"} 
                bgcolor={"secondary.main"} 
                py={1} 
                color="#fff" 
                fontWeight={700} 
                borderRadius={2}
            >
                Thông tin đơn hàng
            </Stack>

            <Grid container spacing={2} display={{xs: 'none',md: 'flex'}}>
                <Grid xs={6}>
                    <Typography variant="body2" fontWeight={700}>
                        Sản phẩm
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography variant="body2" textAlign={"center"} fontWeight={700}>Số lượng</Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography variant="body2" fontWeight={700}>
                        Đơn giá
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography variant="body2" fontWeight={700}>
                        Thành tiền
                    </Typography>
                </Grid>
            </Grid>

            <Divider light sx={{ my: 2 }} />

            <Stack spacing={0} divider={<Divider light />} mb={1}>
                {data?.order_items?.map(item =>
                        <Grid container spacing={2} key={item.id}>
                            <Grid xs={12} md={6}>
                                <Typography variant="body2">
                                    {item?.san_pham?.name} - màu {item?.property?.name}
                                </Typography>
                            </Grid>
                            <Grid xs={2} display={{xs: 'none',md: 'block'}}>
                                <Typography variant="body2" textAlign={"center"}>{item?.qty}</Typography>
                            </Grid>
                            <Grid xs={5} md={2} display={{xs: 'none',md: 'block'}}>
                                <Typography variant="body2">
                                    <FormatCurrency data={item?.price} />
                                </Typography>
                            </Grid>
                            <Grid xs={5} md={2} display={{xs: 'none',md: 'block'}}>
                                <Typography variant="body2">
                                    <FormatCurrency data={+item?.price * +item?.qty} />
                                </Typography>
                            </Grid>

                            <Grid xs={12} display={{xs: 'block',md: 'none'}}>
                            {item?.qty} x <FormatCurrency data={item?.price} /> = <FormatCurrency data={+item?.price * +item?.qty} />
                            </Grid>
                        </Grid>
                )}
            </Stack>

            <Divider light sx={{ my: 2 }} />

            <Grid container spacing={2}>
                <Grid xs={9} md={10}>
                    <Typography variant="body2" fontWeight={700}>
                        Tạm tính
                    </Typography>
                </Grid>
                <Grid xs={3} md={2}>
                    <FormatCurrency data={data?.subtotal} />
                </Grid>
            </Grid>
            <Divider light sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid xs={9} md={10}>
                    <Typography variant="body2" fontWeight={700}>
                        Phí ship
                    </Typography>
                </Grid>
                <Grid xs={3} md={2}>
                    <Typography variant="body2">Miễn phí</Typography>
                </Grid>
            </Grid>
            <Divider light sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid xs={9} md={10}>
                    <Typography variant="body2" fontWeight={700}>
                        Tổng
                    </Typography>
                </Grid>
                <Grid xs={3} md={2}>
                    <FormatCurrency data={data?.total} />
                </Grid>
            </Grid>
        </>
    )
}