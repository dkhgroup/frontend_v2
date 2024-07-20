import { globalConfig } from "@/theme/globalConfig";
import { Container, Link } from "@mui/material";
import { Box } from "@mui/system";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import SearchBoxHeader from "./search";
import Navbar from "./navbar";
import IconHeader from "./icon/iconheader";

export default function MainNav() {
    return (
        <Box component={"header"} bgcolor="#ffffff" >
            <Container maxWidth={globalConfig.maxWidth}>
                <Grid container spacing={2} alignItems={"center"} >
                    <Grid xs={1.5}>
                        <Link href="/">
                            <Image
                                src="/assets/doc.svg"
                                width={89}
                                height={60}
                                alt="Dkhgroup logo"
                            />
                        </Link>
                    </Grid>
                    <Grid xs={7.5} display={{ xs: 'none', lg: 'block' }}>
                        <Navbar />
                    </Grid>
                    <Grid xs={2} display={{ xs: 'none', lg: 'block' }}>
                        <SearchBoxHeader />
                    </Grid>
                    <Grid xs={1} display={{ xs: 'none', lg: 'block' }}>
                        <IconHeader />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}