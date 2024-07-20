import { cdnImage } from "@/components/ui/cdnImage";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const height = 580
const xsHeight = 400

export default function SlideImage({item}){
    return(
        <Box
            sx={{
                '& img': {
                    minHeight: 300,
                    width: '100%',
                    height: 580,
                    objectFit: 'cover'
                }
            }}
        >
            <Link href={item?.attributes?.link}>
                <Image
                    src={cdnImage(item?.attributes?.image?.data?.attributes?.url)}
                    width={item?.attributes?.image?.data?.attributes?.width}
                    height={height}
                    alt="DKH Group Slide"
                />
            </Link>
        </Box>
    )
}