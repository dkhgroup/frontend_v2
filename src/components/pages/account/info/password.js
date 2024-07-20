import axiosClient from "@/axiosConfig/axiosClient"
import { changePassword } from "@/validations/auth"
import { LoadingButton } from "@mui/lab"
import { Alert, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react"
import { useFormik } from "formik"
import { useState } from "react"

export default function ChangePassword({userData}){

    const [show1,setShow1] = useState(false)
    const [show2,setShow2] = useState(false)
    const [show3,setShow3] = useState(false)

    const [loading,setLoading] = useState(false)

    const [showErr,setShowErr] = useState(false)
    const [mesErr,setMesErr] = useState(false)
    const [statusErr,setStatusErr] = useState("success")

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: changePassword,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            setLoading(true)
            setShowErr(false)
            try {
                await axiosClient.post('auth/change-password', values)
                setShowErr(true)
                setMesErr("Đổi mật khẩu thành công")
                setStatusErr("success")
            } catch (error) {
                setShowErr(true)
                setStatusErr("error")
                setMesErr(error?.response?.data?.error?.name ==="ValidationError" ? "Mật khẩu hiện tại không đúng, vui lòng thử lại" : "Có lỗi ! Vui lòng thử lại sau")
            }
            setLoading(false)
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} my={3} maxWidth={400}>
                <Typography mb={3} variant="h2" component={"h2"} fontSize={24} fontWeight={700} letterSpacing={-1.5}>
                    Đổi mật khẩu
                </Typography>
                {showErr && <Alert severity={statusErr}>{mesErr}</Alert>}
                <TextField
                    id="currentPassword" 
                    name="currentPassword" 
                    hiddenLabel
                    variant="outlined"
                    placeholder="Mật khẩu hiện tại"
                    size="small"
                    onChange={formik.handleChange}
                    type={show3 ? 'text' : 'password'}
                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconLock size={18}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start" onClick={() => setShow3(!show3)} sx={{cursor: 'pointer'}}>
                                {show3 ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id="password" 
                    name="password" 
                    hiddenLabel
                    variant="outlined"
                    placeholder="Mật khẩu mới"
                    size="small"
                    onChange={formik.handleChange}
                    type={show1 ? 'text' : 'password'}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconLock size={18}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start" onClick={() => setShow1(!show1)} sx={{cursor: 'pointer'}}>
                                {show1 ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
                            </InputAdornment>
                        )
                    }}
                />
                <TextField 
                    id="passwordConfirmation" 
                    name="passwordConfirmation" 
                    hiddenLabel
                    variant="outlined"
                    placeholder="Nhập lại mật khẩu mới"
                    size="small"
                    onChange={formik.handleChange}
                    type={show2 ? 'text' : 'password'}
                    error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                    helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconLock size={18}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start" onClick={() => setShow2(!show2)} sx={{cursor: 'pointer'}}>
                                {show2 ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
                            </InputAdornment>
                        )
                    }}
                />
            </Stack>
            <LoadingButton
                type="submit" 
                variant="outlined" 
                size="large"
                loading={loading}
            >
                Đổi mật khẩu
            </LoadingButton>
        </form>
    )
}