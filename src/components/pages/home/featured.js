import { calcHeight } from "@/components/format/calcHeight";
import ProductGrid from "@/components/product/grid";
import { Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export default function FeatureProductSection({datas}){
    return(
        <Stack width={'100%'} p={3} className="dkh-bg-linear" my={3} borderRadius={1.5}>
          <Typography variant="h2" component={"h2"} color={"#fff"} fontWeight={700} fontSize={20} lineHeight={1.3} textTransform={"uppercase"} mb={2}>
            SẢN PHẨM NỔI BẬT
          </Typography>
          <Grid container spacing={2}>

            {datas && datas?.data?.map(item =>
              <Grid xs={6} md={6} lg={3} key={item.id}>
                <ProductGrid 
                    id={item?.id} 
                    data={item?.attributes}
                    widthImg={400}
                    heightImg={calcHeight(
                        item?.attributes?.thumbnail?.data?.attributes?.width,
                        item?.attributes?.thumbnail?.data?.attributes?.height,
                        400
                    )}
                /> 

              </Grid>
            )}
          </Grid>
        </Stack>
    )
}