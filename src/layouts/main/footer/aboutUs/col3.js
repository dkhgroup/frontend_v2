import { cdnImage } from "@/components/ui/cdnImage";
import { useContact } from "@/hooks/useContact";
import { Skeleton, Stack,Link } from "@mui/material";
import Image from "next/image";

export default function FooterAboutUsSection3(){
    
    const {contact, isLoading} = useContact()

    if(isLoading) return

    return(
        <Stack 
            direction={"row"}
            spacing={2.5}
        >
            {!contact && <Skeleton variant="circular" width={40} height={40} />}
            {contact && contact?.data?.attributes?.social?.map(item =>
                <Link href={item.link} key={item.id}>
                    <Image
                        src={cdnImage(item?.icon?.data?.attributes?.url,'/assets/fb.svg')}
                        width={40}
                        height={40}
                        alt="DKGroup Fanpage"
                    />
                </Link>
            )}
            
        </Stack>
    )
}