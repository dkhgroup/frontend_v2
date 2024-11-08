import BreakCrumbDkh from "@/components/ui/breakcrumb";
import { globalConfig } from "@/theme/globalConfig";
import { Box, Container } from "@mui/material";

function formatDataCategories(data){
    let result = []
    data?.map(item => result.push(
        {
            id: item.id,
            text: item.name,
            link: `/product-category/${item.slug}`
        }
    )) 

    return result
}

export default function BreakCrumbProductDetail({data}){

    const categories = formatDataCategories(data?.product_categories)

    return(
        <Box py={2} bgcolor={"#f8f8f8"}>
            <Container maxWidth={globalConfig.maxWidth}>
                <BreakCrumbDkh
                    loops={categories}
                    text={data?.name}
                />
            </Container>
        </Box>
    )
}