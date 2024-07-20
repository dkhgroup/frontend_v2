import { useNavbar } from "@/hooks/useNavbar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NavItem from "./navItem"

export default function Navbar(){

    const router = useRouter()
    const {navbar,isLoading} = useNavbar()

    const [menus,setMenus] = useState()

    useEffect(()=>{
        setMenus(navbar?.data?.attributes?.items?.data)
    },[isLoading])

   

    return(
        <nav>
                {menus &&
                    <ul>
                        {menus?.map(item => <NavItem key={item.id} item={item} />)}
                    </ul>
                }
        </nav>
    )
}