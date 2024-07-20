import { beginCheckoutEvent } from "@/components/ga4";
import SeoMetaTag from "@/components/pageConfig/meta";
import CheckOutform from "@/components/pages/cart";
import { useCart } from "@/hooks/useCart";
import { useEffect, useRef } from "react";

export default function CheckOutPage() {

    const initialized = useRef(false)

    const {cart,isLoading, mutate} = useCart()
    
    useEffect(()=>{

        if(isLoading) return

        if (!initialized.current) {
            initialized.current = true
            // viewItemEvent(data)
            beginCheckoutEvent(cart)
        }
        
    },[isLoading])

    return (
        <>
            <SeoMetaTag
                title="Đặt đơn hàng | DKH Group"
                description="Form đặt hàng trên website DKH Group Việt Nam"
            />

            <CheckOutform />
        </>
    )
}