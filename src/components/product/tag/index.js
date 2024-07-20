import { Stack, Typography } from "@mui/material";

export default function TagProduct({datas}){
    return(
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
            
            {datas?.map(item => 
                <Stack 
                    justifyContent={"center"}
                    alignItems={"center"}
                    bgcolor={item?.color}
                    px={1}
                    py={0.3}
                    borderRadius={1}
                    key={item.id}
                >
                    <Typography textTransform={"uppercase"} variant="body2" fontSize={10} fontWeight={600} color={"#fff"}>
                        {item.text}
                    </Typography>
                </Stack>
            )}
        </Stack>
    )
}