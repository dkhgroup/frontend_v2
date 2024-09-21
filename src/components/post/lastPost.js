import { Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; 
import PostGrid from "./grid";
import { format } from "date-fns";
import { globalConfig } from "@/theme/globalConfig";

export default function LastPost({datas, hideTitle = false}){
    return(
        <Stack spacing={2}>
            {!hideTitle && 
                <Typography variant="h2" component={"h2"} fontSize={22} fontWeight={700} color="secondary.main" letterSpacing={-1}>
                    Tin tức mỗi ngày
                </Typography>
            }
            <Grid container spacing={2}>
                {datas?.map(item => 
                    <Grid xs={12} md={6} lg={3} key={item.id}>
                        <PostGrid
                            link={`/${item?.attributes?.slug}`}
                            thumbnail={`${globalConfig.img_url}${item?.attributes?.thumbnail?.data?.attributes?.url}`}
                            width={item?.attributes?.thumbnail?.data?.attributes?.width || 599}
                            height={item?.attributes?.thumbnail?.data?.attributes?.height || 300}
                            linkCat={`/category/${item?.attributes?.blog_category?.data?.attributes?.slug}`}
                            title={item?.attributes?.title}
                            category_title={item?.attributes?.blog_category?.data?.attributes?.name}
                            date={format(new Date(item?.attributes?.createdAt), 'dd/MM/yyyy')}
                            description={item?.attributes?.excerpt}
                        />
                    </Grid>
                )}
                
            </Grid>
        </Stack>
    )
}