import { Stack } from "@mui/material";
import UserIcon from "./user";
import CartIcon from "./cart";

export default function IconHeader(){
    return(
        <Stack
            direction={"row"} 
            justifyContent={"flex-end"} 
            alignItems={"flex-start"} 
            spacing={1}
        >
            <UserIcon />
            <CartIcon />
        </Stack>
    )
}