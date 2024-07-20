import { createMarkup } from "@/components/createMarkup";
import SvgIconDkh from "@/components/ui/svgIcon";
import { globalConfig } from "@/theme/globalConfig";
import { Box, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";

export default function FeatureContent({data}){
    return(
        <Grid container spacing={2} bgcolor={"#f2f2f2"} borderRadius={2}>
            <Grid xs={12} md={7}>
                <Stack p={{xs:2,md: 7}} spacing={2}>
                    <Box dangerouslySetInnerHTML={createMarkup(data?.content_featured)} sx={styles.content}/>
                    <Typography variant="h4" component={"h4"} sx={styles.h4}>
                        Ưu điểm
                    </Typography>
                    <Stack direction={{xs: 'column',md: 'row'}} spacing={1.5} >
                        {data?.advantages?.length > 0 && data?.advantages?.map(item =>
                            <Stack 
                                spacing={1}
                                border={1}
                                p={1}
                                borderRadius={2}
                                borderColor={"#aaa"}
                                key={item.id}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <SvgIconDkh icon={item.icon} width={36} height={36} color={item.color_icon} />
                                <Typography textAlign={"center"} variant="body2" fontWeight={700} color={item?.color_text}>
                                    {item?.text}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={12} md={5} p={0}>
                <Box 
                    sx={{
                        '& img': {
                            width: '100%',
                            height: 'auto'
                        }
                    }}
                >
                    <Image
                        src={data?.img_featured?.url ? `${globalConfig.img_url}${data?.img_featured?.url}` : '/assets/default-product-thumbnail.png'}
                        width={data?.img_featured?.width || 567}
                        height={data?.img_featured?.height || 496}
                        alt={data?.name}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

const styles = {
    content: {
        '& h2': {
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.5
        },
        '& h4': {
            fontSize: 20,
            fontWeight: 700,
            color: 'secondary.main',
            mb: 3
        }
    },
    h4: {
        fontSize: 16,
        fontWeight: 700,
        mb: 3,
        mt: 4
    }
}