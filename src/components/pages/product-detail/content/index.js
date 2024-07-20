import { Container, Stack, Typography } from "@mui/material";
import FeatureContent from "./feature";
import ContentProduct from "./content";

export default function ProductDetailContent({data}){
    return(
        <Container maxWidth={'lg'}>
            <Stack spacing={2} mt={{xs: 0,md: 4}} mb={4}>
                <Typography variant="h2" component={"h2"} fontSize={20} fontWeight={700}>
                    CHI TIẾT SẢN PHẨM
                </Typography>
                <FeatureContent data={data} />
                <ContentProduct data={data} />
            </Stack>
        </Container>
    )
}