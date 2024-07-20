import LoadingProductSection from "@/components/screen/loadingProduct";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Grid from '@mui/material/Unstable_Grid2';
import ProductGrid from "@/components/product/grid";

export default function ResultSearch({...props}){
    return(
        <Stack spacing={1.5}>
            <Typography variant="body2" fontWeight={600} color={'#555'}>
                {props?.isResult ? "Kết quả tìm kiếm" : "Sản phẩm gợi ý cho bạn"}
            </Typography>

            {props?.loading && <LoadingProductSection />}

            {!props?.loading && props?.products &&
                <Grid 
                    container 
                    spacing={{xs:1,lg: 2}}
                    sx={styles.gridProduct}
                >
                    {props?.products?.map(item => 
                        <Grid xs={6} md={3} key={item.id}>
                            <ProductGrid 
                                id={item?.id} 
                                data={item?.attributes}
                                setOpen={props.setOpen}
                                heightImg={350}
                                widthImg={350}
                                directionCartBtn="column"
                                justifyContentCartBtn="flex-start"
                                alignItemsCartBtn="flex-start"
                                isModal={true}
                            />
                        </Grid>
                    )}
                </Grid>
            }

            {!props?.loading && !props?.isResult &&
                <Grid 
                    container 
                    spacing={{xs:1,lg: 2}}
                    sx={styles.gridProduct}
                >
                    {props?.datas?.san_phams?.data?.map(item =>
                        <Grid xs={6} md={3} key={item.id}>
                            <ProductGrid 
                                id={item?.id} 
                                data={item?.attributes}
                                setOpen={props.setOpen}
                                heightImg={350}
                                widthImg={350}
                                directionCartBtn="column"
                                justifyContentCartBtn="flex-start"
                                alignItemsCartBtn="flex-start"
                                isModal={true}
                            />
                        </Grid>
                    )}
                </Grid>
            }

            {!props?.loading && props?.products?.length < 1 && 
                <Stack justifyContent={"center"} alignItems={"center"} py={5}>
                    <Image
                        src="/assets/not-found.svg"
                        width={400}
                        height={266}
                        alt="search not found"
                    />
                    <Typography variant="body1" fontWeight={300} fontSize={16}>
                        Xin lỗi nhưng không có sản phẩm nào phù hợp với từ khóa bạn đang tìm kiếm
                    </Typography>
                </Stack>
            }
        </Stack>
    )
}

const styles = {
    gridProduct: {
        marginLeft: {
            xs: "-8px !important",
            lg: 0
        },
        marginRight: {
            xs: "-8px !important",
            lg: 0
        }
    }
}