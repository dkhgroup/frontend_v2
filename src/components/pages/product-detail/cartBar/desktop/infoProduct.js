import FormatCurrency from "@/components/format/money";
import { cdnImage } from "@/components/ui/cdnImage";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { getAttributes } from "@/components/func/product";

export default function InfoProduct({data,selectAttribute}){

    const thumbnail = getAttributes(data,selectAttribute)
    const thisAttribute = data?.attributes?.find(item => item?.property?.id == selectAttribute)

    return(
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Image
                src={thumbnail?.thumbnail || cdnImage(data?.thumbnail?.url)}
                width={50}
                height={50}
                alt={data?.name}
            />
            <Stack spacing={0}>
                <Typography variant="body1" fontWeight={700} color="secondary.main">
                    {data?.name} {thisAttribute && ` - ${thisAttribute?.property?.name}`}
                </Typography>
                <Typography fontWeight={700} fontSize={20} color="primary.main">
                    <FormatCurrency data={data?.price} />
                </Typography>
            </Stack>
        </Stack>
    )
}