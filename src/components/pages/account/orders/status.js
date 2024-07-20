import { Stack, Typography } from "@mui/material";

export default function OrderItemStatus({status}){
    return(
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Stack justifyContent={"center"} alignItems={"center"} py={.3} px={1} bgcolor={status.color} borderRadius={2}>
                <Typography variant="body2" fontSize={11} color="#fff">
                    {status.name}
                </Typography>
            </Stack>
        </Stack>
    )
}