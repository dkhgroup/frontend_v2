import { globalConfig } from "@/theme/globalConfig"
import { Stack, Container, Divider } from "@mui/material"
import FooterAboutUs from "./aboutUs"
import FooterInfo from "./info"
import FooterCopyRight from "./copyRight"
import SpeedDialButtonDefault from "./speedDial/default"
import MiniCart from "@/components/cart/miniCart"

export default function FooterMain() {
    return (
        <>
            <Stack
                gap={0}
                sx={{
                    bgcolor: "secondary.main"
                }}
            >
                <Container maxWidth={globalConfig.maxWidth}>
                    <FooterAboutUs />
                    <Divider sx={{ my: .5, bgcolor: '#666666' }} />
                    <FooterInfo />
                    <Divider sx={{ my: .5, bgcolor: '#666666' }} />
                    <FooterCopyRight />
                </Container>
                <SpeedDialButtonDefault />
            </Stack>
            <MiniCart />
        </>
    )
}