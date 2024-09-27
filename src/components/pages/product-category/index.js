import { globalConfig } from "@/theme/globalConfig";
import { Container, Divider, Stack, Typography } from "@mui/material";
import ProductFilter from "./filter";
import { useState } from "react";
import { useProductCategory } from "@/hooks/useProductCategory";
import LoadingProductSection from "@/components/screen/loadingProduct";
import ProductGrid from "@/components/product/grid";
import Grid from '@mui/material/Unstable_Grid2';
import { LoadingButton } from "@mui/lab";

function sortProduct(value){
    if(value == "price-high") return 'sort[0]=price:desc'
    if(value == "best-sale") return ''
    if(value == "price-low") return 'sort[0]=price:asc'
    return 'sort[0]=createdAt:desc'
}

export default function ListProductCategory({ ...props }) {
    
    const [filter, setFilter] = useState();
    const [loading,setLoading] = useState(false)
    const [loadingSort, setLoadingSort] = useState(false)


    const {products,isLoading,refreshProductList} = useProductCategory(props?.id)

    const handleClick = async () => {
        setLoading(true)
        try {
            await refreshProductList(props?.id, products?.data?.length + 4, sortProduct(filter))
        } catch (error) {
            console.log("🚀 ~ handleClick ~ error:", error)
        }
        setLoading(false)
    }

    const handleChangeSort = async (event) => {
        setFilter(event.target.value)
        setLoadingSort(true)
        try {
            await refreshProductList(props?.id, products?.data?.length, sortProduct(event.target.value))
        } catch (error) {
            console.log("🚀 ~ handleChangeSort ~ error:", error)
        }
        setLoadingSort(false)
    }


    return(
        <Container maxWidth={globalConfig.maxWidth}>
            <Stack spacing={2} my={3}>
                <ProductFilter
                    filter={filter}
                    handleChangeSort={handleChangeSort}
                    loadingSort={loadingSort}
                />
                {isLoading ? 
                    <LoadingProductSection />
                : 
                    <Grid container spacing={2}>
                        {products && products?.data?.map(item =>
                            <Grid xs={6} md={6} lg={3} key={item.id}>
                                <ProductGrid
                                    id={item?.id} 
                                    data={item?.attributes} 
                                />
                            </Grid>
                        )}
                    </Grid>
                }
                <Divider sx={{ my: 2 }} />

                {products?.data?.length < products?.meta?.pagination?.total &&
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <LoadingButton
                            variant="contained"
                            size="small"
                            loading={loading}
                            onClick={handleClick}
                        >
                            Xem thêm
                        </LoadingButton>
                    </Stack>
                }

                <Typography variant="body1" textAlign={"center"}>
                    Hiển thị {products?.data?.length} trên tổng số {products?.meta?.pagination?.total} sản phẩm
                </Typography>
            </Stack>
        </Container>
    )
}