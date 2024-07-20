import { Box, Stack } from "@mui/material";
import HeaderMain from "./main/header";
import { useDevice } from "@/hooks/useDevice";
import { useEffect } from "react";
import { clarity } from 'react-microsoft-clarity';
import FooterMain from "./main/footer";

export default function MainLayout({children}){

    // const {device} = useDevice()

    useEffect(()=>{

        // Start seeing data on the Clarity dashboard with your id
        clarity.init("mdthcfppnc");

        // Identify the user
        clarity.identify('USER_ID', { userProperty: 'value' });

        // Cookie consent
        clarity.consent();

        // Setup a custom tag
        // clarity.setTag('key', 'value');

        // Upgrade session
        clarity.upgrade('upgradeReason');

        // Check if Clarity has been initialized before calling its methods
        if (clarity.hasStarted()) {
            clarity.identify('mdthcfppnc', { userProperty: 'value' });
        }
        
    },[])

    return(
        <Stack
            sx={{
                bgcolor: '#fff !important'
            }}
        >
            <HeaderMain />
            <Box flex={1}>
                {children}
            </Box>
            <FooterMain />
        </Stack>
    )
}