import { phoneValidation } from "@/validations/auth";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authFirebase } from "../firebase/init";
import Swal from "sweetalert2";
import axiosClient from "@/axiosConfig/axiosClient";

const generateRecaptcha = () => {
    try{
        const recaptcha = new RecaptchaVerifier(
            authFirebase,
            "recaptcha-container",
            {
              size: 'invisible',
            },
        );
        console.log(recaptcha)
    }catch(e){
        console.log(e)
    }
    
};

export default function ForgotPasswordForm({...props}){

    const [loading,setLoading] = useState(false)

    const sendOtpFirebase = async (phone) => {
        
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        const request = await signInWithPhoneNumber(authFirebase, phone, appVerifier)
        props.setConfirmationResult(request)
        
    };

    const formik = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: phoneValidation,
        onSubmit: async (values) => {
            setLoading(true);
            // kiểm tra số điện thoại đã tồn tại chưa
            try {
                const checkPhone = await axiosClient.post('/open/auth/check-phone-exist',{
                    phone: values.phone
                })

                if(!checkPhone?.exist) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops,...',
                        text: 'Số điện thoại không tồn tại, vui lòng kiểm tra lại hoặc liên hệ admin để được hỗ trợ'
                    })
                    setLoading(false);
                    return
                }


            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi ,...',
                    text: 'Lỗi không xác định, vui lòng F5 trình duyệt và thử lại'
                })

                setLoading(false);
                return
            }
            const phoneNumber = "+84" + values.phone.slice(1);

            try {
                await sendOtpFirebase(phoneNumber);
                props.setPhoneNumber(values.phone)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title:'Ops,...',
                    text: 'Bạn đã yêu cầu OPT quá nhiều lần, vui lòng thử lại sau'
                })
            }
            setLoading(false);
        }
    })

    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box id="recaptcha-container" />
                <Stack spacing={1.5}>
                    <TextField 
                        id="phone"
                        name="phone" 
                        hiddenLabel
                        variant="outlined"
                        sx={styles.input}
                        placeholder="Số điện thoại của bạn"
                        size="small"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <LoadingButton loading={loading} type="submit" variant="contained" size="large">
                        Kiểm tra
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