import { useCart } from "@/hooks/useCart";
import { IconButton, Stack, Typography } from "@mui/material";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react"

async function ChangeQtyFunc(qty,id,changeQty){
    try {
        await changeQty({qty:qty},id)
    } catch (error) {
        console.log("🚀 ~ ChangeQtyFunc ~ error:", error)
    }
}

export default function QtyChange({...props}){

    const [qty,setQty] = useState(+props?.current || 1)

    const {changeQty} = useCart()

    useEffect(() => {
        const timeOutId = setTimeout(() => ChangeQtyFunc(qty,props.item.id,changeQty), 500);
        return () => clearTimeout(timeOutId);
    }, [qty]);

    const minus = async () => {
        if(qty < 2){
            setQty(1);
            return
        }
        setQty(qty - 1)
    }

    return(
        <>
            <Stack
                direction={"row"} 
                justifyContent={"space-between"} 
                alignItems={"center"}
                width={{xs: 120, md: 150}}
                border={1}
                borderRadius={5}
                py={0.2}
            >
                <IconButton onClick={minus}>
                    <IconMinus size={15}/>
                </IconButton>
                <Typography variant="body2" flex={1} textAlign={"center"} fontWeight={700}>
                    {qty}
                </Typography>
                <IconButton onClick={() => setQty(qty + 1)}>
                    <IconPlus size={15}/>
                </IconButton>
            </Stack>
        </>
    )
}