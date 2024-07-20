import FormatCurrency from "@/components/format/money";
import { useCart } from "@/hooks/useCart";
import { Divider, Stack, Typography } from "@mui/material";
import { getTotalCart } from "@/components/cart/func";

export default function CartCalc(){

    const {cart,isLoading} = useCart()
    const total = getTotalCart(cart)

    return(
        <Stack spacing={2} divider={<Divider light/>}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1" fontWeight={500} textAlign={"left"}>
                    Tạm Tính
                </Typography>
                <Typography variant="body1" fontWeight={500} textAlign={"right"}>
                    <FormatCurrency data={total} />
                </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1" fontWeight={500} textAlign={"left"}>
                    Phí Ship
                </Typography>
                <Typography variant="body1" fontWeight={500} textAlign={"right"}>
                    Miễn phí
                </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1" fontWeight={500} textAlign={"left"}>
                    Số tiền cần thanh toán
                </Typography>
                <Typography variant="body1" fontWeight={500} textAlign={"right"}>
                    <FormatCurrency data={total} />
                </Typography>
            </Stack>
        </Stack>
    )
}