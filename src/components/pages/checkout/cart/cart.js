import { Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CartItem from "./cartItem";
import { useCart } from "@/hooks/useCart";

export default function CartInfo({setLoading}){

    const {cart,isLoading} = useCart()

    return(
        <Stack spacing={1}>
            <Grid container spacing={2} sx={{display: {xs:'none',md: 'flex'}}}>
                <Grid xs={12} md={6}>
                    <Typography sx={styles.lable}>
                        SẢN PHẨM
                    </Typography>
                </Grid>
                <Grid xs={5} md={2.5}>
                    <Typography sx={styles.lable1}>
                        SỐ LƯỢNG
                    </Typography>
                </Grid>
                <Grid xs={5} md={2.5}>
                    <Typography sx={styles.lable1}>
                        GIÁ
                    </Typography>
                </Grid>
                <Grid xs={2} md={1}></Grid>
            </Grid>
            <Stack spacing={1} divider={<Divider light/>}>
                {cart && cart?.cart_items?.map(item =>
                    <CartItem key={item.id} item={item} setLoading={setLoading}/>
                )}
            </Stack>
        </Stack>
    )
}

const styles = {
    lable: {
        color: '#888'
    },
    lable1: {
        color: '#888',
        textAlign: 'center'
    },
}