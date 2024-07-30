import { Stack, Typography } from "@mui/material";
import CartInfo from "./cart";
import CartCalc from "./calc";
import { LoadingButton } from "@mui/lab";
import LoadingCart from "./loadingCart";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { getTotalCart } from "@/components/cart/func";
import FormatCurrency from "@/components/format/money";
import { event } from "nextjs-google-analytics";
import { globalConfig } from "@/theme/globalConfig";

const getItemCart = (datas) => {

    let result = []

    if (!datas) return

    datas?.cart_items?.map(item => {
        result.push({
            item_id: item?.id,
            item_name: item?.san_pham?.name,
            price: +item?.san_pham?.price,
            item_category: null,
            item_variant: item?.property?.name,
            item_brand: "Maldini",
            coupon: "",
            discount: 0,
            product_review: null,
            product_rating: null,
            product_id: item?.san_pham?.sku,
            item_list_id: null,
            item_list_name: null,
            quantity: +item?.qty
        })
    })

    return result
}

export default function CartSection({ loadingForm }) {

    const [loading, setLoading] = useState(false)

    const { cart, isLoading } = useCart()

    const total = getTotalCart(cart)

    if (isLoading) return <LoadingCart />

    return (
        <Stack spacing={3}>

            {loading ? <LoadingCart /> :
                <>
                    <Typography variant="h2" component={"h2"} sx={styles.title}>
                        Giỏ hàng
                    </Typography>
                    <CartInfo setLoading={setLoading} />
                    <CartCalc />
                    <LoadingButton
                        variant="contained"
                        size="large"
                        sx={{ py: 1 }}
                        type="submit"
                        loading={loadingForm}
                    >
                        Thanh toán <FormatCurrency data={total} /> (COD)
                    </LoadingButton>
                </>
            }
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