import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, Stack, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from "date-fns";
import { useState } from "react";
import { updateUser } from "@/validations/auth";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function InfoUserEditMode({userData,setUpdateMode}){

    const [loading,setLoading] = useState(false)
    const {changeInfo} = useAuth()

    const formik = useFormik({  
        initialValues: {
            fullname: userData?.fullname || "",
            user_email: userData?.user_email || "",
            sex: userData?.sex || "",
            birtDay: userData?.birtDay || "",
        },
        validationSchema: updateUser,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await changeInfo(values)
                setUpdateMode(false)
                toast.success('Cập nhật thành công!', {
                    duration: 4000,
                    position: 'top-right'
                });
            } catch (error) {
                toast.error('Có lỗi! Vui lòng thử lại sau', {
                    duration: 4000,
                    position: 'top-right'
                });
            }
            setLoading(false)
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} mb={3}>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Số điện thoại</Typography>
                    </Box>
                    <Typography fontWeight={700}>
                        {userData?.phone || '-'}
                    </Typography>
                </Stack>

                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Họ và tên</Typography>
                    </Box>
                    <Box minWidth={300}>
                        <TextField
                            id="fullname" 
                            name="fullname"
                            hiddenLabel
                            variant="outlined"
                            placeholder="Họ tên của bạn"
                            size="small"
                            fullWidth
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                            helperText={formik.touched.fullname && formik.errors.fullname}
                        />
                    </Box>
                </Stack>
                
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Email</Typography>
                    </Box>
                    <Box minWidth={300}>
                        <TextField
                            id="user_email" 
                            name="user_email"
                            hiddenLabel
                            variant="outlined"
                            placeholder="Địa chỉ email của bạn"
                            size="small"
                            fullWidth
                            value={formik.values.user_email}
                            onChange={formik.handleChange}
                            error={formik.touched.user_email && Boolean(formik.errors.user_email)}
                            helperText={formik.touched.user_email && formik.errors.user_email}
                        />
                    </Box>
                </Stack>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Giới tính</Typography>
                    </Box>
                    <Box minWidth={300}>
                        <FormControl fullWidth>
                            <InputLabel id="sex-label">Giới tính</InputLabel>
                            <Select
                                labelId="sex-label"
                                id="sex"
                                name="sex"
                                value={formik.values.sex}
                                label="Giới tính"
                                onChange={formik.handleChange}
                                fullWidth
                            >
                                <MenuItem value={"Nam"}>Nam</MenuItem>
                                <MenuItem value={"Nữ"}>Nữ</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Box width={200}>
                        <Typography fontWeight={400}>Ngày sinh</Typography>
                    </Box>
                    <Box minWidth={300}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                format="dd/MM/yyyy"
                                views={['day', 'month', 'year']}
                                value={new Date(formik.values.birtDay)}
                                onChange={(e) => formik.setFieldValue('birtDay', format(new Date(e),'yyyy-MM-dd'))}
                            />
                        </LocalizationProvider>
                    </Box>
                </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LoadingButton 
                    type="submit"
                    variant="outlined"
                    loading={loading}
                >
                    CẬP NHẬT
                </LoadingButton>
                <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={() => setUpdateMode(false)}
                >
                    Đóng lại
                </Button>
            </Stack>
        </form>
    )
}