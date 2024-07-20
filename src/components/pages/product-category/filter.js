import { CircularProgress, Stack, Typography } from "@mui/material";

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ProductFilter({...props}){

    return(
        <Stack direction={"row"} spacing={3} justifyContent={"flex-start"} alignItems={"center"} width={400}>
            <Box>
                <Typography color={'#888'} fontWeight={400}>
                    PHÂN LOẠI
                </Typography>
            </Box>
            <Box flex={1}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props?.filter || "new"}
                    onChange={(value) => props?.handleChangeSort(value)}
                    size="small"
                    sx={{
                        borderRadius: 20,
                        minWidth: 200,
                        bgcolor: '#F2F2F2'
                    }}
                >
                    <MenuItem value={'new'}>Mặc định</MenuItem>
                    <MenuItem value={'best-sale'}>Mới nhất</MenuItem>
                    <MenuItem value={'price-low'}>Giá thấp - cao</MenuItem>
                    <MenuItem value={'price-high'}>Giá cao - thấp</MenuItem>
                </Select>
            </Box>
            {props?.loadingSort && <CircularProgress size={20}/>}
        </Stack>
    )
}