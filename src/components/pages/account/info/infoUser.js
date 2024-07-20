import { Box, Button, Stack, Typography } from "@mui/material";
import { format } from "date-fns";

export default function InfoUserShowMode({userData,setUpdateMode}){
    return(
        <>
            <Stack spacing={2} mb={3}>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Số điện thoại</Typography>
                    </Box>
                    <Typography fontWeight={700}>
                        {userData?.phone}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Họ và tên</Typography>
                    </Box>
                    <Typography fontWeight={700}>
                        {userData?.fullname}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Email</Typography>
                    </Box>
                    <Typography fontWeight={700}>
                        {userData?.user_email || '-'}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Giới tính</Typography>
                    </Box>
                    <Typography fontWeight={700}>
                        {userData?.sex || '-'}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Ngày sinh</Typography>
                    </Box>
                    <Typography fontWeight={700}>
                        {userData?.birtDay ? format(new Date(userData?.birtDay),'dd/MM/yyyy') : '-'}
                    </Typography>
                </Stack>
            </Stack>
            
            <Button variant="outlined" onClick={() => setUpdateMode(true)}>Cập nhật</Button>
        </>
    )
}