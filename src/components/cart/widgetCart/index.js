import FormatCurrency from "@/components/format/money";
import { Box, Card, CardContent, Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { IconX } from "@tabler/icons-react";
import { useCart } from "@/hooks/useCart";
import CartEmpty from "../cartEmpty";
import { cdnImage } from "@/components/ui/cdnImage";

function getImageAttribute(id,data){
    let result;
    data.map(item => {
        if(item.property.id !== id) return
        result = item.thumbnail.url
    })

    return result
}

export default function WidgetCart({ setShow }) {

    const { cart } = useCart()

    return (
        <Card sx={{ width: 330 }}>
            <CardContent>
                <Stack spacing={1.5}>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

                        <Typography variant="body2" color={'#333'} fontWeight={700}>
                            Thông tin giỏ hàng
                        </Typography>
                        <IconButton onClick={setShow}>
                            <IconX size={20} />
                        </IconButton>
                    </Stack>
                    <Divider light />
                    {cart?.cart_items?.length > 0 ?
                        <>
                            <Stack maxHeight={'calc(110vh - 500px)'} sx={{ overflowY: 'auto' }} spacing={1.5} divider={<Divider light />}>
                                {cart && cart?.cart_items?.map(item =>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} key={item.id}>
                                        <Box>
                                            <Image
                                                src={cdnImage(getImageAttribute(item.property.id,item.san_pham.attributes))}
                                                width={60}
                                                height={60}
                                                alt=""
                                            />
                                        </Box>
                                        <Stack spacing={1}>
                                            <Typography variant="body1" fontWeight={700}>
                                                {item?.san_pham?.name}
                                            </Typography>

                                            <Stack spacing={0.2}>
                                                <Typography variant="body2" fontWeight={500}>
                                                    Màu {item?.property?.name}
                                                </Typography>
                                                <Typography variant="body1" fontWeight={600} color="primary.main">
                                                    <FormatCurrency data={+item?.san_pham?.price} /> x {+item.qty}
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                    </Stack>
                                )}
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
                        </>
                        :
                        <CartEmpty width={200} height={200} showLink={false}/>
                    }
                </Stack>
            </CardContent>
        </Card>
    )
}