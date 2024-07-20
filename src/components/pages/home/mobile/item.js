import { cdnImage } from "@/components/ui/cdnImage";
import { useProductTab } from "@/hooks/useProductTab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Grid from '@mui/material/Unstable_Grid2';
import ProductGrid from "@/components/product/grid";

const formatData = (data) => {
    let result = []

    data?.data?.map((item,key) => {
        if(key > 3) return
        result.push(item)
    })

    return result
}

export default function HomePageMobileCategory({data}){

    const router = useRouter()

    const {listProduct, isLoading} = useProductTab(data?.id)

    const datas = formatData(listProduct)

    const handleClick = () => {
        // router.push(`/danh-muc/${data?.attributes?.slug}_id=${data?.id}`)
        // console.log(data?.attributes?.slug)
        router.push(`/product-category/${data?.attributes?.slug}`)
    }

    return(
        <Stack spacing={1}>
            <Stack 
                width={"100%"} 
                height={300} 
                sx={{
                    backgroundImage: `url(${cdnImage(data?.attributes?.thumbnail?.data?.attributes?.url)})`,
                    bgcolor: '#888',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                justifyContent={"flex-end"}
                position={"relative"}
            >
                <Stack justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1} px={2} py={4} position={"relative"} zIndex={1}>
                    <Typography variant="h2" component={"h2"} fontSize={26} fontWeight={700} textTransform={"uppercase"} color="#fff">
                        {data?.attributes?.name}
                    </Typography>
                    <Typography variant="body1" color="#fff" mb={2}>
                        {data?.attributes?.description}
                    </Typography>
                    <Button variant="contained" size="small" color="white" onClick={handleClick}>
                        Khám phá ngay
                    </Button>
                </Stack>

                <Box
                    sx={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 4.21%, rgba(0, 0, 0, 0.8) 100%)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                    }}
                />
            </Stack>

            <Grid container spacing={2}>
                {datas && datas?.map(item =>
                    <Grid xs={6} md={6} lg={3} key={item.id}>
                        <ProductGrid id={item?.id} data={item?.attributes}/>
                    </Grid>
                )}
            </Grid>
        </Stack>
    )
}