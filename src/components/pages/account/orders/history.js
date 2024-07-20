import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";

export default function OrderHistory({data}){
    return(
        <Stack spacing={.5}>
            <Typography variant="body2">
                {format(new Date(data?.createdAt), 'dd/MM/yyyy hh:ii')}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
                {data?.text}
            </Typography>
        </Stack>
    )
}