import { Button, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import FormAddressBook from "./form";
import { useFormik } from "formik";
import { useAddressBook } from "@/hooks/useAddressBook";
import toast from "react-hot-toast";
import { addressBookSchema } from "@/validations/account";

export default function EditAddressBookBtn({datas}){
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)

    const {update} = useAddressBook()

    const formik = useFormik({
        initialValues: {
            "name": datas?.name || "",
            "region": datas?.region?.id || 0,
            "district": datas?.district?.id || 0,
            "ward": datas?.ward?.id || 0,
            "address": datas?.address || "",
            "receiver": datas?.receiver || "",
            "phone": datas?.phone || "",
            "default": datas?.default,
            "default_note": datas?.default_note || "",
        },
        validationSchema: addressBookSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await update(values,datas?.id)
                setOpen(false)
                toast.success('Cập nhật địa chỉ thành công!', {
                    duration: 4000,
                    position: 'top-right'
                });
            } catch (error) {
                console.log("🚀 ~ onSubmit: ~ error:", error)
            }
            setLoading(false)
        }
    })
    return(
        <>
            <Button 
                variant="outlined" 
                size="small" 
                color="primary"
                onClick={()=>setOpen(true)}
            >
                Chỉnh sửa
            </Button>
            <Dialog
                open={open}
                onClose={()=> setOpen(false)}
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle>
                    <Typography color="primary.main" fontSize={18} fontWeight={700} letterSpacing={-1}>
                        Chỉnh sửa địa chỉ nhận hàng - {datas?.name}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <FormAddressBook formik={formik} loading={loading} btnText="Cập nhật"/>
                </DialogContent>
            </Dialog>
        </>
    )
}