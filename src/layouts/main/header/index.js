import { Box, Stack, useMediaQuery } from "@mui/material";
import TopHeader from "./top";
import MainNav from "./mainnav";
import HeaderMobile from "../headerMobile";

export default function HeaderMain() {

    const matches = useMediaQuery('(max-width:920px)');

    if (matches) {
        return (
            <Box id="main-container" display={{xs: 'block', lg: 'none'}}>
                <HeaderMobile />
            </Box>
        )
    }

    return(
        <Box sx={{ borderBottom: '1px solid #eee' }} id="main-container" display={{xs: 'none', lg: 'block'}}>
            <Stack spacing={0}>
                <TopHeader />
                <MainNav />
            </Stack>
        </Box>
    )
}