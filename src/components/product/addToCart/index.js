import { LoadingButton } from "@mui/lab";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react";
import toast from "react-hot-toast";
import { showMiniCart } from "@/store/cart/minicart";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch } from "@/store/hook";
import { cdnImage } from "@/components/ui/cdnImage";
import { addToCartEvent } from "@/components/ga4";
import { getAttributeName } from "@/components/func/product";
import { addToCartFBEvent } from "@/components/capi/event";

async function getAttributes(data,selectAttribute){
    let result;
    
    data?.attributes?.map(item => {
        if(item.property?.data?.id != selectAttribute) return;
        result = {
            thumbnail: cdnImage(item.thumbnail.data.attributes.url),
            productName: data.name,
            property: item.property.data.attributes.name,
            qty: 1,
            price: +data.price
        }
    })

    return result
}


export default function AddToCart(props){

    const [loading,setLoading] = useState(false)

    const {addToCart} = useCart()

    const dispatch = useAppDispatch()

    const handleAddToCart = async () => {

        setLoading(true)

        const thisAttributes = props?.data?.attributes?.find(el => el?.property?.data?.id === props?.selectAttribute)

        try {
            await addToCart({
                "san_pham": props.id,
                "property": props.selectAttribute,
                "qty": 1
            })
        } catch (error) {
            toast.error('Thêm sản phẩm thất bại',{
                duration: 4000,
                position: 'top-right'
            })
        }

        try{

            // handle GA

            let params = {
                currency: 'VND',
                value: +props?.data?.price,
                items: [
                    {
                        item_id: thisAttributes?.sku, 
                        item_name: props?.data?.name,
                        discount: 0,
                        index: +props?.id,
                        item_brand: 'Maldini',
                        item_category: props?.data?.product_categories?.data[0]?.attributes?.name,
                        item_variant: thisAttributes?.property?.data?.attributes?.name,
                        price: +props?.data?.price,
                        quantity: 1
                    }
                ]
            }

            addToCartEvent(params)

            await addToCartFBEvent(
                +props?.data?.price * 1,
                thisAttributes?.sku,
                1,
                +props?.data?.price
            )

            const miniCartData = await getAttributes(props.data,props.selectAttribute)

            dispatch(showMiniCart(miniCartData))

        } catch (error) {
            // toast.error('Thêm sản phẩm thất bại',{
            //     duration: 4000,
            //     position: 'top-right'
            // })
        }
        setLoading(false)
    }
    
    return(
        <LoadingButton
            variant="outlined"
            size="small"
            startIcon={<AddShoppingCartIcon />}
            sx={{
                fontSize: 12
            }}
            loading={loading}
            onClick={handleAddToCart}
        >
            Thêm giỏ hàng
        </LoadingButton>
    )
}