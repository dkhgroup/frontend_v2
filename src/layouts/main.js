import { Box, Stack } from "@mui/material";
import HeaderMain from "./main/header";
import { useDevice } from "@/hooks/useDevice";
import { useEffect } from "react";
import { clarity } from 'react-microsoft-clarity';
import FooterMain from "./main/footer";

export default function MainLayout({footer,navbar,children}){

    const {device} = useDevice()

    useEffect(()=>{

        // Start seeing data on the Clarity dashboard with your id
        clarity.init("m50wxksnd5");

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
            clarity.identify('m50wxksnd5', { userProperty: 'value' });
        }
        
    },[])

    return(
        <Stack
            sx={{
                bgcolor: '#fff !important'
            }}
        >
            <HeaderMain navbar={navbar}/>
            <Box flex={1}>
                {children}
            </Box>
            <FooterMain footer={footer}/>
        </Stack>
    )
}