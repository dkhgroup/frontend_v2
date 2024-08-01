import { Link, Stack } from "@mui/material";
import NavbarMobile from "./navbar";
import Image from "next/image";
import SearchIconMobile from "./search";
import UserIcon from "../header/icon/user";
import CartIcon from "../header/icon/cart";

export default function HeaderMobile({navbar}){
    return(
        <Stack 
            direction={"row"} 
            justifyContent={"space-between"} 
            alignItems={"center"}
            bgcolor={"secondary.main"}
            p={1}
        >
             <Stack direction={"row"} spacing={0}>
                <NavbarMobile navbar={navbar}/>
                <SearchIconMobile />
             </Stack>
             <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
                <Link href={"/"}>
                    <Image
                        src="/assets/doc-light.svg"
                        width={88}
                        height={60}
                        alt="DKH Group Logo"
                    />
                </Link>
            </Stack>
            <Stack direction={"row"} spacing={0}>
                <UserIcon iconColor={"#fff"} iconSize={28}/>
                <CartIcon iconColor={"#fff"} iconSize={28}/>
            </Stack>
        </Stack>
    )
}