import ProductGrid from "@/components/product/grid";
import { globalConfig } from "@/theme/globalConfig";
import { Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export default function BestSaleSection({datas}){
    return(
        <Stack width={'100%'} my={5} borderRadius={1.5}>
          <Typography variant="h2" component={"h2"} fontWeight={700} fontSize={20} lineHeight={1.3} textTransform={"uppercase"} mb={2}>
            BÁN CHẠY NHẤT
          </Typography>
          <Grid container spacing={2}>

            {datas && datas?.data?.map(item =>
              <Grid xs={6} lg={3} key={item.id}>
                <ProductGrid id={item?.id} data={item?.attributes}/>
              </Grid>
            )}
          </Grid>
        </Stack>
    )
}