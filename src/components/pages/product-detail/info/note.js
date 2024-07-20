import { Box, Stack, Typography } from "@mui/material";
import { createMarkup } from "@/components/createMarkup";

export default function FeatureNote({data}){
    return(
        <Stack spacing={2}>
            <Typography variant="h3" component={"h3"} fontWeight={700} fontSize={16}>
                Đặc điểm nổi bật
            </Typography> 
            <Box dangerouslySetInnerHTML={createMarkup(data?.featured_note)} sx={{
                '& ul': {
                    paddingLeft: 2
                },
                '& li': {
                    fontSize: 14,
                    paddingBottom: '5px',
                    letterSpacing: '-.5px'
                }
            }}/>
        </Stack>
    )
}