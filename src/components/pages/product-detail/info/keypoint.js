import SvgIconDkh from "@/components/ui/svgIcon";
import { Stack, Typography } from "@mui/material";

export default function KeypointProduct({...props}){
    return(
        <Stack 
            spacing={2}
            bgcolor={'#eee'}
            p={2}
            borderRadius={2}
        >
            <Typography variant="h3" component={'h3'} fontWeight={700} color="primary.main" fontSize={16} lineHeight={1.2}>
                {props?.data?.keypoint_title}
            </Typography>

            <Stack spacing={1}>
                {props?.data?.keypoint && props?.data?.keypoint?.map(item =>
                
                    <Stack direction={"row"} spacing={1} key={item.id}>
                        <SvgIconDkh icon={item?.icon} color={item?.color}/>
                        <Typography variant="body2" fontWeight={500}>
                            {item.content}
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}