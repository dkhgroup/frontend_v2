import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { useState } from "react";
import ItemList from "./item";
import FormatCurrency from "@/components/format/money";
import OrderHistory from "./history";
import CancelOrder from "./cancel";
import WestIcon from '@mui/icons-material/West';

const widthLeft = 80
const widthRight = 300

export default function DetailBtn({item}){

    const [open, setOpen] = useState(false);
    
    return(
        <>
            <Button variant="text" endIcon={<IconArrowNarrowRight size={15}/>} size="small" onClick={()=>setOpen(true)}>
                Chi tiết
            </Button>
            <Drawer 
                open={open} 
                onClose={()=>setOpen(false)}
                anchor={"right"}
                disableScrollLock
                disableAutoFocus
            >
                <Stack width={"400px"} height={'100vh'}>
                    <Stack bgcolor={"secondary.main"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="body1" fontWeight={600} color={'#fff'} p={2}>
                            Chi tiết đơn hàng {item.order_code}
                        </Typography>
                        <IconButton onClick={()=>setOpen(false)}>
                            <IconX color="#fff" />
                        </IconButton>
                    </Stack>

                    <Stack spacing={3} flexGrow={1} p={2} sx={{overflowY: 'auto'}}>

                        <Typography fontWeight={700} color={"primary.main"}>
                            Thông tin khách hàng
                        </Typography>

                        <Stack spacing={1} divider={<Divider light />}>
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                <Box width={widthLeft}>
                                    <Typography variant="body2">
                                        Họ tên
                                    </Typography>
                                </Box>
                                <Box width={widthRight}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {item.receiver}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                <Box width={widthLeft}>
                                    <Typography variant="body2">
                                        Địa chỉ
                                    </Typography>
                                </Box>
                                <Box width={widthRight}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {item.address} - {item.ward.name} - {item.district.name} - {item.region.name}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>

                        <Typography fontWeight={700} color={"primary.main"}>
                            Sản phẩm
                        </Typography>

                        <Stack spacing={1.5} divider={<Divider light />}>
                            {item?.order_items?.map(itemChild => 
                                <ItemList item={itemChild} key={itemChild.id}/>
                            )}

                            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>
                                <Typography variant="body2">
                                    Tổng tiền
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    <FormatCurrency data={item.total} />
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>
                                <Typography variant="body2">
                                    Phí Ship
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    Miễn phí
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>
                                <Typography variant="body2">
                                    Phương thức giao hàng
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    COD - Giao hàng thu tiền
                                </Typography>
                            </Stack>
                        </Stack>

                        <Typography fontWeight={700} color={"primary.main"}>
                            Lịch sử đơn hàng
                        </Typography>

                        <Stack spacing={1.5} divider={<Divider light />}>
                            {item?.order_histories?.map(item1 => <OrderHistory key={item1.id} data={item1} />)}
                        </Stack>


                    </Stack>
                    {(item?.status?.code === "pending" || item?.status?.code === "confrim") &&
                        <Stack p={2} sx={{bgcolor: '#f2f2f2', borderTop: '1px solid #eee'}} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Button variant="text" color="secondary" startIcon={<WestIcon />} onClick={()=>setOpen(false)}>
                                Quay lại
                            </Button>
                            <CancelOrder data={item} setOpen={setOpen}/>
                        </Stack>
                    }
                </Stack>
            </Drawer>
        </>
    )
}