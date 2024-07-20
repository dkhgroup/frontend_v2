import { Stack, TextField, Typography } from "@mui/material";

export default function DkhInput({inputLabel,...props}){
    return(
        <Stack spacing={1}>
            {inputLabel && 
                <Typography variant="body2">
                    {inputLabel}
                </Typography>
            }
            <TextField
                {...props}
            />
        </Stack>
    )
}