import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/validations/auth";
import { LoadingButton } from "@mui/lab";
import { Alert, InputAdornment, Stack, TextField } from "@mui/material";
import { IconEye, IconEyeOff, IconLock, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from 'react-hot-toast';

export default function RegisterForm(){
    const [show1,setShow1] = useState(false)
    const [show2,setShow2] = useState(false)
    const [loading,setLoading] = useState(false)

    const [showError,setShowError] = useState(false)
    const [error,setError] = useState("")

    const router = useRouter()

    const {register} = useAuth()

    const formik = useFormik({
        initialValues: {
            fullname: "",
            phone: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setLoading(true)
            setShowError(false)
            try {
                await register(values)
                toast.success('Đăng ký tài khoản thành công!', {
                    duration: 4000,
                    position: 'top-right'
                });
                router.push('/')
            } catch (error) {
                setShowError(true)
                setError(error?.response?.data)
            }
            setLoading(false)
        }
    })

    return(
        <>
            {showError && <Alert severity="error">{error}</Alert>}
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={1.5}>
                    <TextField 
                        id="fullname" 
                        name="fullname"
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Họ tên của bạn"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconUser size={18}/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField 
                        id="phone" 
                        name="phone" 
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Số điện thoại của bạn"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconPhone size={18}/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField 
                        id="password" 
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Mật khẩu"
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
                        id="repeatPassword" 
                        name="repeatPassword" 
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        size="small"
                        onChange={formik.handleChange}
                        type={show2 ? 'text' : 'password'}
                        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                        helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
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
                    <LoadingButton 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        loading={loading}
                    >
                        Đăng ký
                    </LoadingButton>
                </Stack>
            </form>
        </>
    )
}

const styles = {
    input: {
        '& input': '10px 30px',
        '& fieldset': {
            borderRadius: 5
        }
    }
}