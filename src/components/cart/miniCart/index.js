import FormatCurrency from "@/components/format/money";
import { Box, Card, CardContent, Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { hideMiniCart } from "@/store/cart/minicart"
import { useAppDispatch, useAppSelector } from "@/store/hook"

import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";

export default function MiniCart(){

    const miniCart = useAppSelector(state => state.minicartReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timeOutId = setTimeout(() => dispatch(hideMiniCart()), 2000);
        return () => clearTimeout(timeOutId);
      }, [miniCart]);

    return(
        <Box className={`minicart ${miniCart?.show && 'active'}`}>
            <Card sx={{ width: 330 }}>
                <CardContent>
                    <Stack spacing={1.5}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

                        <Typography variant="body2" color={'#333'} fontWeight={700}>
                            Đã thêm vào giỏ hàng!
                        </Typography>
                        <IconButton onClick={() => dispatch(hideMiniCart())}>
                            <IconX size={20}/>
                        </IconButton>
                        </Stack>
                        <Divider light/>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1}>
                            <Box>
                                <Image
                                    src={miniCart?.item?.thumbnail || '/assets/empty-product-thumbnail.png'}
                                    width={60}
                                    height={60}
                                    alt=""
                                />
                            </Box>
                            <Stack spacing={1}>
                                <Typography variant="body1" fontWeight={700}>
                                    {miniCart?.item?.productName}
                                </Typography>

                                <Stack spacing={0.2}>
                                    <Typography variant="body2" fontWeight={500}>
                                        Màu {miniCart?.item?.property}
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} color="primary.main">
                                        <FormatCurrency data={miniCart?.item?.price || 0} />
                                    </Typography>
                                </Stack>
                            </Stack>

                        </Stack>
                        <Link href="/cart" underline="none">
                            <Stack
                                borderRadius={4}
                                border="1px solid #666"
                                px={3}
                                py={1}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Typography variant="body2" color="#666" fontWeight={500}>Xem giỏ hàng</Typography>
                            </Stack>
                        </Link>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}