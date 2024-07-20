import { useCart } from "@/hooks/useCart";
import { LoadingButton } from "@mui/lab";
import { useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCartEvent } from "@/components/ga4";

export default function RemoveCartItem({item}){

    const [loading,setLoading] = useState(false)

    const {removeItemCart} = useCart()

    const handleDelete = async () => {
        setLoading(true)
        try {
            await removeItemCart(item.id)
            removeFromCartEvent(item)
            // beginCheckoutEvent(cart)
        } catch (error) {
            console.log("🚀 ~ handleDelete ~ error:", error)
        } 
        setLoading(false)
    }

    return(
        <LoadingButton
            loading={loading}
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
        />
    )
}