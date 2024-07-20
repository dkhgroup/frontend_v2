import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import FooterInfotSection1 from "./col1";
import FooterInfotSection2 from "./col2";
import FooterInfotSection3 from "./col3";
import FooterInfotSection4 from "./col4.";

export default function FooterInfo(){
    return(
        <Box component={"section"} py={4}>
            <Grid 
                container 
                spacing={5} 
            >
                <Grid xs={12} md={4.5}>
                    <FooterInfotSection1 />
                </Grid>
                <Grid xs={12} md={2.5}>
                    <FooterInfotSection2 />
                </Grid> 
                <Grid xs={12} md={2.5}>
                    <FooterInfotSection3 />
                </Grid> 
                <Grid xs={12} md={2.5}>
                    <FooterInfotSection4 />
                </Grid> 
            </Grid>
        </Box>
    )
}