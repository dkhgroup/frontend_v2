import { useAuth } from "@/hooks/useAuth";
import { IconButton } from "@mui/material";
import { IconUserCog } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function UserIcon({iconColor = '#422F2C', iconSize=28}){
    const router = useRouter()
    const {userData} = useAuth()
    return(
        <IconButton 
            sx={{minWidth: '40px'}}
            onClick={() => router.push(userData ? '/account' : '/login')}
        >
            <IconUserCog
                color={iconColor}
                size={iconSize}
            />
        </IconButton>
    )
}