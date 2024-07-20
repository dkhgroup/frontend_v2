import { Box, Divider, Stack, Typography } from "@mui/material";

export default function ConsumerInfo({data}){
    return(
        <>
            <Stack display={{xs: 'none', md: 'flex'}} mb={3} justifyContent={"center"} alignItems={"center"} bgcolor={"secondary.main"} py={1} color="#fff" fontWeight={700} borderRadius={2}>
                Thông tin khách hàng
            </Stack>
            <Stack spacing={1} divider={<Divider light />}>

                <Stack direction={"row"} spacing={1}>
                    <Box minWidth={{xs:150,md:200}}>
                        <Typography variant="body1" fontWeight={500}>
                            Họ tên
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                        {data?.receiver || ""}
                    </Typography>
                </Stack>

                <Stack direction={"row"} spacing={1}>
                    <Box minWidth={{xs:150,md:200}}>
                        <Typography variant="body1" fontWeight={500}>
                            Số điện thoại
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                        {data?.phone || ""}
                    </Typography>
                </Stack>

                <Stack direction={{xs: 'column', md: 'row'}} spacing={1}>
                    <Box minWidth={200}>
                        <Typography variant="body1" fontWeight={500}>
                            Địa chỉ nhận hàng
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                        {data?.address || ""}
                    </Typography>
                </Stack>

                <Stack direction={"row"} spacing={1}>
                    <Box minWidth={{xs:150,md:200}}>
                        <Typography variant="body1" fontWeight={500}>
                            Phường
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                        {data?.ward?.name || ""}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                    <Box minWidth={{xs:150,md:200}}>
                        <Typography variant="body1" fontWeight={500}>
                            Quận
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                    {data?.district?.name || ""}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                    <Box minWidth={{xs:150,md:200}}>
                        <Typography variant="body1" fontWeight={500}>
                            Tỉnh / Thành phố
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                        {data?.region?.name || ""}
                    </Typography>
                </Stack>

                <Stack direction={{xs: 'column', md: 'row'}} spacing={1}>
                    <Box minWidth={200}>
                        <Typography variant="body1" fontWeight={500}>
                            Ghi chú
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                        {data?.note || ""}
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}