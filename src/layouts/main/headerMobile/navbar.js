import { Box, Button, Drawer } from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import FirstItemNavMobile from "./navbar/first";
import SecondItemNavbar from "./navbar/secound";

export default function NavbarMobile(){

    const [open,setOpen] = useState(false)
    const [showChild,setShowChild] = useState(0)

    return(
        <>
            <Button 
                variant="text" 
                sx={{minWidth: '40px'}} 
                onClick={() => setOpen(true)}
            >
                <IconMenu2 size={28} color="#fff"/>
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <Box 
                    position={"relative"}
                    width={'100%'}
                    sx={{
                        overflowX: 'hidden',
                        overflowY: 'auto'
                    }}
                >
                    <FirstItemNavMobile
                        setOpen={setOpen}
                        setShowChild={setShowChild}
                        showChild={showChild}
                    />
                    <SecondItemNavbar 
                        setOpen={setOpen}
                        setShowChild={setShowChild}
                        showChild={showChild}
                    />
                </Box>
            </Drawer>
        </>
    )
}