import {Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import VerificationInput from "react-verification-input";
import Swal from "sweetalert2";

export default function FormOtp({ ...props }) { 

    const [loading,setLoading] = useState(false)

    const handleCheckOtp = async (value) => {
        setLoading(true)
        try {
            await props.confirmationResult.confirm(value)
            props.setShowForm(true)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ops,...',
                text: 'OTP không đúng, vui lòng thử lại'
            })
        }
        setLoading(false)
    }

    return (
        <Stack spacing={1.5} justifyContent={"space-between"} alignItems={"center"}>

                <VerificationInput
                    onComplete={(value) => handleCheckOtp(value)}
                    validChars="0-9"
                    inputProps={{ inputMode: "numeric" }}
                    autoFocus
                />

                {loading &&
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        position="absolute"
                        top={0}
                        left={0}
                        height="100%"
                        bgcolor="rgb(0,0,0,0.3)"
                    >
                        <CircularProgress size={20}/>
                    </Stack>
                }
        </Stack>
    );
}
