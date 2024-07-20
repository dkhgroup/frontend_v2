import { LoadingButton } from "@mui/lab"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch } from "@/store/hook";
import { getAttributes } from "@/components/func/product";
import { showMiniCart } from "@/store/cart/minicart";
import toast from "react-hot-toast";

export default function BtnAddToCart(props){

    const thisAttribute = props?.data?.attributes?.find(item => item?.property?.id == props?.selectAttribute)

    const [loading,setLoading] = useState(false)
    const {addToCart} = useCart()

    const dispatch = useAppDispatch()

    const handleAddToCart = async () => {
        setLoading(true)
        try {
            await addToCart({
                "san_pham": props.data?.id,
                "property": props.selectAttribute,
                "qty": props.formik.values.qty
            })

            // handle GA
            
            const miniCartData = getAttributes(props.data,props.selectAttribute)
            dispatch(showMiniCart(miniCartData))

        } catch (error) {
            toast.error('Thêm sản phẩm thất bại',{
                duration: 4000,
                position: 'top-right'
            })
        }
        setLoading(false)
    }

    return(
        <LoadingButton
            variant="contained"
            onClick={handleAddToCart}
            startIcon={<AddShoppingCartIcon />}
        >
            Đặt mua màu {thisAttribute?.property?.name}
        </LoadingButton>
    )
}