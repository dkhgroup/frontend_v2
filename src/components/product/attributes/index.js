import { cdnImage } from "@/components/ui/cdnImage";
import { globalConfig } from "@/theme/globalConfig";
import { Stack } from "@mui/material";
import Image from "next/image";

export default function Attribute({item,selectAttribute,setSelectAttribute,setThumbnail}){
    
    const handleChangeAttribute = () => {
        setSelectAttribute(item?.property?.data?.id)
        if(item?.thumbnail?.data?.attributes?.url){
            setThumbnail(cdnImage(item?.thumbnail?.data?.attributes?.url))
        }
    }

    return(
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            border={item?.property?.data?.id == selectAttribute && "1px solid #000"}
            borderRadius={3}
            onClick={() => handleChangeAttribute(item)}
            key={item.id}
            sx={{
                p: "2px",
            }}
        >
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    cursor: 'pointer',
                    '& img': {
                        borderRadius: 3
                    }
                }}
            >
                <Image
                    src={cdnImage(item.img_color?.data?.attributes?.url)}
                    width={40}
                    height={20}
                    alt=""
                />
            </Stack>
        </Stack>
    )
}