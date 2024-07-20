import { CircularProgress, Stack } from "@mui/material";

export default function LoadingSection(){
    return(
        <Stack justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} minWidth={500}>
            <CircularProgress />
        </Stack>
    )
}