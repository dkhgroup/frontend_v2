import axiosClient from "@/axiosConfig/axiosClient";
import { passwordChangeValidation } from "@/validations/auth";
import { LoadingButton } from "@mui/lab";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function SetNewPasswordForm({...props}){

    const [show1,setShow1] = useState(false)
    const [show2,setShow2] = useState(false)
    const [loading,setLoading] = useState(false)

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            password: "",
            repeatPassword: ""
        },
        validationSchema: passwordChangeValidation,
        onSubmit: async(values) => {
            setLoading(true)
            try {
                await axiosClient.post('/open/auth/set-new-password',{
                    phone: props.phoneNumber,
                    ...values
                })
                
                toast.success('Đổi mật khẩu thành công thành công!', {
                    duration: 4000,
                    position: 'top-right'
                });

                router.push('/login')

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops,...',
                    text: 'Có Lỗi, vui lòng liên hệ hỗ trợ để xử lý'
                })
                
            }
            setLoading(false)
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1.5}>
                <TextField 
                    id="password" 
                    hiddenLabel
                    variant="outlined"
                    sx={styles.input}
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
                    id="repeatPassword" 
                    name="repeatPassword" 
                    hiddenLabel
                    variant="outlined"
                    sx={styles.input}
                    placeholder="Nhập lại mật khẩu mới"
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
                <LoadingButton loading={loading} type="submit" variant="contained" size="large">
                    Đặt lại mật khẩu
                </LoadingButton>
            </Stack>
        </form>
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