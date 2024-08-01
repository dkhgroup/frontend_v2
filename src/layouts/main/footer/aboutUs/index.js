import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import FooterAboutUsSection1 from "./col1";
import FooterAboutUsSection2 from "./col2";
import FooterAboutUsSection3 from "./col3";

export default function FooterAboutUs({footer}){
    return(
        <Box component={"section"} py={4}>
            <Grid 
                container 
                spacing={5} 
                justifyContent={"center"} 
                alignItems={"center"}
            >
                <Grid xs={12} md={5}>
                    <FooterAboutUsSection1 contact={footer}/>
                </Grid>
                <Grid xs={12} md={4}>
                    <FooterAboutUsSection2 contact={footer}/>
                </Grid> 
                <Grid xs={12} md={3}>
                    <FooterAboutUsSection3 contact={footer}/>
                </Grid> 
            </Grid>
        </Box>
    )
}