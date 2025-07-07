import { globalConfig } from "@/theme/globalConfig";
import { Box, Container, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import { useState } from "react";

import toast from "react-hot-toast";
import { showMiniCart } from "@/store/cart/minicart"

import ProductGallery from "./gallery";
import ProductDetailTitle from "./title";
import ProductDetailPrice from "./price";
import ProductDetailAttriButes from "./attributes";
import AddtoCartGroup from "./addToCart";
import ChatZaloOaBtn from "./chatZalo";
import KeypointProduct from "./keypoint";
import FeatureNote from "./note";
import { useFormik } from "formik";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch } from "@/store/hook";
import CartBarDesktop from "../../product-detail/cartBar/desktop";
import { formatDataGallery,getAttributeName,getAttributes } from "@/components/func/product";
import CartBarMobile from "../../product-detail/cartBar/mobile";
import { addToCartEvent } from "@/components/ga4";
import { addToCartFBEvent } from "@/components/capi/event";

export default function InfoProductDetail({data}){

    const [selectAttribute, setSelectAttribute] = useState()

    const gallaryProduct = formatDataGallery(data?.gallary)

    const [gallery,setGallery] = useState(gallaryProduct)

    const [loading,setLoading] = useState(false)

    const {addToCart} = useCart()

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            qty: 1
        },
        onSubmit: async (values) => {
            
            
            setLoading(true)
            
            try {
                const thisAttributes = data?.attributes?.find(el => el?.property?.id === selectAttribute)

                await addToCart({
                    "san_pham": data.id,
                    "property": selectAttribute,
                    "qty": values.qty
                })

                let params = {
                    currency: 'VND',
                    value: +data?.price * values.qty,
                    items: [
                        {
                            item_id: thisAttributes?.sku,
                            item_name: data?.name,
                            discount: 0,
                            index: +data?.id,
                            item_brand: 'Maldini',
                            item_variant: thisAttributes?.property?.name,
                            price: +data?.price,
                            quantity: 1
                        }
                    ]
                }

                addToCartEvent(params)

                await addToCartFBEvent(
                    +data?.price * values.qty,
                    thisAttributes?.sku,
                    values.qty,
                    +data?.price
                )

                const miniCartData = getAttributes(data,selectAttribute)
                dispatch(showMiniCart(miniCartData))

            } catch (error) {
                toast.error('Thêm sản phẩm thất bại',{
                    duration: 4000,
                    position: 'top-right'
                })
            }
            setLoading(false)
        }
    })

    return(
        <Box pt={5} pb={{xs: 3,md: 0}}>
            <Container maxWidth={globalConfig.maxWidth}>
                <Grid container spacing={2} justifyContent={"space-between"} alignItems={"flex-start"}>
                    <Grid xs={12} md={6.5}>
                        <ProductGallery data={data} gallery={gallery}/>
                    </Grid>
                    <Grid xs={12} md={5}>
                        <Stack spacing={2.5}>
                            <ProductDetailTitle data={data}/>
                            {/* <ProductDetailPrice data={data}/> */}
                            <Box component={"p"} sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "primary.main"
                            }}>
                                Giá: Liên hệ
                            </Box>
                            <ProductDetailAttriButes
                                data={data} 
                                selectAttribute={selectAttribute}
                                setSelectAttribute={setSelectAttribute}
                                gallery={gallery}
                                setGallery={setGallery}
                                gallaryProduct={gallaryProduct}
                            />
                            {/* <AddtoCartGroup
                                data={data} 
                                selectAttribute={selectAttribute}
                                formik={formik}
                                loading={loading}
                            /> */}
                            <ChatZaloOaBtn />
                            {/* <KeypointProduct data={data} /> */}
                            <FeatureNote data={data} />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <CartBarDesktop 
                data={data} 
                selectAttribute={selectAttribute} 
                setSelectAttribute={setSelectAttribute}
                formik={formik}
            />
            <CartBarMobile 
                data={data} 
                selectAttribute={selectAttribute} 
                setSelectAttribute={setSelectAttribute}
                formik={formik}
            />
        </Box>
    )
}