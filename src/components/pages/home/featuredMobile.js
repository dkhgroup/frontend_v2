import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import ProductGrid from "@/components/product/grid";

export default function FeatureProductMobile({...props}){

    const [tab,setTab] = useState(1)

    return(
        <Box mb={2}>

            <Stack direction={"row"} alignItems={"center"} spacing={1} my={2}>
                <Button 
                    variant={tab === 1 ? "contained" : "outlined"}
                    color={tab === 1 ? "primary" : "secondary"}
                    size="small"
                    sx={{borderRadius: 5}}
                    onClick={() => setTab(1)}
                >
                    Sản phẩm nổi bật
                </Button>
                <Button 
                    variant={tab === 2 ? "contained" : "outlined"}
                    color={tab === 2 ? "primary" : "secondary"}
                    size="small"
                    sx={{borderRadius: 5}}
                    onClick={() => setTab(2)}
                >
                    Sản phẩm bán chạy
                </Button>
            </Stack>

            {tab === 1 &&
                <Grid container spacing={2}>
                    {props?.featured && props?.featured?.data?.map(item =>
                        <Grid xs={6} md={6} lg={3} key={item.id}>
                            <ProductGrid id={item?.id} data={item?.attributes}/>
                        </Grid>
                    )}
                </Grid>
            }

            {tab === 2 &&
                <Grid container spacing={2}>
                    {props?.bestSale && props?.bestSale?.data?.map(item =>
                        <Grid xs={6} md={6} lg={3} key={item.id}>
                            <ProductGrid id={item?.id} data={item?.attributes}/>
                        </Grid>
                    )}
                </Grid>
            }

        </Box>
    )
}