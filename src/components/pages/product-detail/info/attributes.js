import { cdnImage } from "@/components/ui/cdnImage";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { handleChangeAttribute } from "@/components/func/product";

export default function ProductDetailAttriButes({ 
    data, 
    selectAttribute, 
    setSelectAttribute, 
    gallaryProduct,
    gallery,
    setGallery,
}) {

    const thisAttribute = data?.attributes?.find(item => item?.property?.id == selectAttribute)

    return (
        <Stack spacing={1} id="product_info">
            <Stack direction={"row"} alignItems={"center"} spacing={1}>

                <Typography variant="body1" fontWeight={500} letterSpacing={-1}>
                    Màu sắc:
                </Typography>
                {thisAttribute &&
                    <Typography variant="body1" fontWeight={700} letterSpacing={-1}>
                        {thisAttribute?.property?.name}
                    </Typography>
                }
            </Stack>
            <Stack
                direction={"row"}
                spacing={.3}
                width={"100%"}
                sx={{
                    overflowX: "auto"
                }}
            >
                {data?.attributes && data?.attributes?.map(item =>
                    <Stack
                        justifyContent={"center"}
                        alignItems={"center"}
                        border={item?.property?.id == selectAttribute && "1px solid #000"}
                        borderRadius={3}
                        onClick={() => handleChangeAttribute(item,setSelectAttribute,setGallery,gallaryProduct)}
                        key={item.id}
                    >
                        <Stack
                            justifyContent={"center"}
                            alignItems={"center"}
                            m={"2px"}
                            sx={{
                                cursor: 'pointer',
                                '& img': {
                                    borderRadius: 3
                                }
                            }}
                        >
                            <Image
                                src={cdnImage(item?.img_color?.url,"/assets/default-property.jpg")}
                                width={50}
                                height={20}
                                alt=""
                            />
                        </Stack>
                    </Stack>
                )}

            </Stack>
        </Stack>
    )
}