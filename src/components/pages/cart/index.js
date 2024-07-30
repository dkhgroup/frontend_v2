import SeoMetaTag from "@/components/pageConfig/meta";
import CartSection from "@/components/pages/checkout/cart";
import CheckOutForm from "@/components/pages/checkout/form";
import LoadingSection from "@/components/screen/loadingSection";
import CartEmpty from "@/components/ui/cartEmpty";
import { useAddressBook } from "@/hooks/useAddressBook";
import { useCart } from "@/hooks/useCart";
import { globalConfig } from "@/theme/globalConfig";
import { checkoutValidation } from "@/validations/checkout";
import { Container, Divider, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getTotalCart,getDefaultAddress,formatCartItem,getCartItem } from "@/components/cart/func";
import { useOrder } from "@/hooks/useOrder";
import { useRouter } from "next/router";
import { purchaseEvent } from "@/components/ga4";

export default function CheckOutform() {

    const {cart,isLoading, mutate} = useCart()

    const [loadingForm,setLoadingForm] = useState(false)

    const {addressBooks} = useAddressBook()
    const defaultAddress = getDefaultAddress(addressBooks)

    const {orders,create} = useOrder()

    const router = useRouter()
    
    const formik = useFormik({
        initialValues: {
            receiver:  "",
            phone:  "",
            email: "",
            address: "",
            region: 1,
            district: 676,
            ward: 11027,
            note: ""
        },
        validationSchema: checkoutValidation,
        onSubmit: async (values) => {
            setLoadingForm(true)
            try {
                const data = {
                    ...values,
                    subtotal: getTotalCart(cart),
                    shipfee:0,
                    total: getTotalCart(cart),
                    payment_method:1,
                    items: formatCartItem(cart.cart_items),
                    cartItemIdArr: getCartItem(cart.cart_items)
                }
                
                // const createOrder = await create(data)

                // purchaseEvent(cart, createOrder.order_code)

                // router.push(`/cart/success/${createOrder.order_code}`)

            } catch (error) {
                console.log("🚀 ~ onSubmit: ~ error:", error)
            }
            setLoadingForm(false)
        }
    })

    useEffect(()=>{

        if(!defaultAddress) return

        formik.setFieldValue('receiver', defaultAddress?.receiver)
        formik.setFieldValue('phone', defaultAddress?.phone)
        formik.setFieldValue('address', defaultAddress?.address)
        formik.setFieldValue('region', defaultAddress?.region?.id)
        formik.setFieldValue('district', defaultAddress?.district?.id)
        formik.setFieldValue('ward', defaultAddress?.ward?.id)
        formik.setFieldValue('note', defaultAddress?.default_note)

    },[defaultAddress])

    return (
        <>

            {isLoading && <LoadingSection />}

            {!isLoading && (cart?.cart_items?.length < 1) ? <CartEmpty /> :
                <form onSubmit={formik.handleSubmit}>
                    
                    <Stack py={5}>
                        <Container maxWidth={globalConfig.maxWidth}>
                            <Grid container spacing={2}>
                                <Grid xs={12} md={5}>
                                    <CheckOutForm formik={formik} />
                                </Grid>
                                <Grid xs={12} md={0.5}>
                                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                                        <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
                                    </Stack>
                                </Grid>
                                <Grid xs={12} md={6.5}>
                                    <CartSection loadingForm={loadingForm}/>
                                </Grid>
                            </Grid>
                        </Container>
                    </Stack>
                </form>
            }
        </>
    )
}