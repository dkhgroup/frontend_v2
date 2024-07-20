import FormatCurrency from "@/components/format/money";
import { cdnImage } from "@/components/ui/cdnImage";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function ItemList({item}){
    const thisAttribute = item?.san_pham?.attributes?.find(item1 => item1?.property.id == item?.property?.id)
    return(
        <Stack direction={"row"} spacing={2} key={item.id}>
            <Image
                src={cdnImage(thisAttribute.thumbnail?.url)}
                width={60}
                height={60}
                alt={item.san_pham.name}
            />
            <Stack spacing={1}>
                <Typography variant="body2" fontWeight={600}>
                    {item.san_pham.name} - {item?.property?.name}
                </Typography>
                <Typography variant="body2">
                    <FormatCurrency data={item.san_pham.price} /> x {item.qty}
                </Typography>
            </Stack>
        </Stack>
    )
}