import ProductGrid from "@/components/product/grid"
import LoadingProductSection from "@/components/screen/loadingProduct"
import { useProductTab } from "@/hooks/useProductTab"
import { LoadingButton } from "@mui/lab"
import { Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import Grid from '@mui/material/Unstable_Grid2'; 

export default function ProductHomepageTab({tab}){

    const [loading,setLoading] = useState(false)

    const [currentProductNum,setCurrentProductNum] = useState(4)

    const {listProduct,isLoading, loadmoreAction} = useProductTab(tab)

    const handleLoadMore = async () => {
        setLoading(true)
        try {
            await loadmoreAction(currentProductNum + 4)
            setCurrentProductNum(currentProductNum + 4)
        } catch (error) {
            console.log("🚀 ~ handleLoadMore ~ error:", error)
        }
        setLoading(false)
    }

    if(isLoading) return <LoadingProductSection />

    return(
        <Stack spacing={2}>
            <Grid container spacing={2}>
                {listProduct && listProduct?.data?.map(item =>
                    <Grid xs={12} md={6} lg={3} key={item.id}>
                        <ProductGrid id={item?.id} data={item?.attributes} />
                    </Grid>
                )}
            </Grid>
            <Divider />

            {listProduct?.meta?.pagination?.total > listProduct?.data?.length &&
                <Stack justifyContent={"center"} alignItems={"center"}>
                    <LoadingButton
                        variant="contained"
                        size="small"
                        loading={loading}
                        onClick={handleLoadMore}
                    >
                        Xem thêm
                    </LoadingButton>
                </Stack>
            }

            <Typography variant="body1" textAlign={"center"}>
                Hiển thị {listProduct?.data?.length} trên tổng số {listProduct?.data?.length} sản phẩm
            </Typography>
        </Stack>
    )
}