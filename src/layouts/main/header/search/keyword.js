import axiosClient from "@/axiosConfig/axiosClient";
import searchEvent from "@/components/ga4";
import { convertPopulateParams } from "@/params/convert";
import { productParams } from "@/params/products";
import { Chip, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";

export default function KeywordSearchProduct({...props}){

    const handleClick = async(id,keyword) => {
        props.setLoading(true)
        try {
            const request = await axiosClient.get(`/open/products?${convertPopulateParams(productParams)}&filters[product_categories][$eq]=${id}`)
            props.setProducts(request?.data)
            searchEvent(keyword)
        } catch (error) {
            toast.error('Có lỗi, vui lòng thử lại sau', {
                duration: 4000,
                position: 'top-right'
            });
        }
        props.setIsResult(true)
        props.setLoading(false)
    }

    return(
        <Stack spacing={1.5}>
            <Typography variant="body2" fontWeight={600} color={'#555'}>
                {props?.datas?.title_keyword || "Từ khóa nổi bật"}
            </Typography>
            <Stack
                direction={"row"} 
                alignItems={"center"} 
                spacing={1}
                width={'100%'}
                sx={{
                    overflowX: 'auto'
                }}
            >
                {props?.datas?.product_categories?.data && props?.datas?.product_categories?.data?.map(item =>
                    <Chip
                        variant="outlined" 
                        label={item?.attributes?.name}
                        size="small"
                        key={item.id}
                        sx={{cursor: 'pointer'}}
                        onClick={() => handleClick(item?.id,item?.attributes?.name)}
                    />
                )}
            </Stack>
        </Stack>
    )
}