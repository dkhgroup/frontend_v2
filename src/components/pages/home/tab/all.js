import axiosClient from "@/axiosConfig/axiosClient";
import ProductGrid from "@/components/product/grid";
import { convertPopulateParams } from "@/params/convert";
import { productParams } from "@/params/products";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";

export default function AllProductHomepageTab({ datas }) {

    const [loading,setLoading] = useState(false)

    const [products,setProducts] = useState(datas)

    const [currentProductNum,setCurrentProductNum] = useState(products?.data?.length)

    const handleClick = async () => {
        setLoading(true)
        try {
            const url = `/open/products?${convertPopulateParams(productParams)}&pagination[page]=1&pagination[pageSize]=${currentProductNum + 4}&sort[0]=sort_number:asc&sort[1]=id:desc`
            // const url = `/open/products?${convertPopulateParams(productParams)}&pagination[page]=1&pagination[pageSize]=${currentProductNum + 4}`
            const request = await axiosClient.get(url)
            setCurrentProductNum(currentProductNum + 4)
            setProducts(request)
        } catch (error) {
            console.log("🚀 ~ handleClick ~ error:", error)
        }
        setLoading(false)
    }

    return (

        <Stack spacing={2}>
            <Grid container spacing={2}>
                {products && products?.data?.map(item =>
                    <Grid xs={12} md={6} lg={3} key={item.id}>
                        <ProductGrid id={item?.id} data={item?.attributes} />
                    </Grid>
                )}
            </Grid>
            <Divider />
            {products?.meta?.pagination?.total > products?.data?.length &&
                <Stack justifyContent={"center"} alignItems={"center"}>
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
    )
}