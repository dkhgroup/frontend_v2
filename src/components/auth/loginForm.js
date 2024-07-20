import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { loginValidation } from "@/validations/auth";
import { LoadingButton } from "@mui/lab";
import { Alert, InputAdornment, Stack, TextField } from "@mui/material";
import { IconEye, IconEyeOff, IconLock, IconPhone } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm(){

    const [show,setShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const {login} = useAuth()

    const [showError,setShowError] = useState(false)
    const [error,setError] = useState("")

    const {mutate} = useCart()

    const router = useRouter()

    const formik = useFormik({
        initialValues:{
            identifier:"",
            password: ""
        },
        validationSchema: loginValidation,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async(values) => {
            setLoading(true)
            setShowError(false)
            try {
                await login(values)
                await mutate()
                router.push('/account')
            } catch (error) {
                console.log("🚀 ~ onSubmit:async ~ error:", error)
                setShowError(true)
                setError(error?.response?.data || "Có lỗi, vui lòng f5 trang và thử lại")
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
                        id="identifier" 
                        name="identifier"
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Số điện thoại của bạn"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                        helperText={formik.touched.identifier && formik.errors.identifier}
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
                        name="password"
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Mật khẩu"
                        size="small"
                        onChange={formik.handleChange}
                        type={show ? 'text' : 'password'}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconLock size={18}/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start" onClick={() => setShow(!show)} sx={{cursor: 'pointer'}}>
                                    {show ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
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
                        Đăng nhập
                    </LoadingButton>
                </Stack>
            </form>
        </>
    )
}

const styles = {
    input: {
        '& fieldset': {
            borderRadius: 5
        }
    }
}