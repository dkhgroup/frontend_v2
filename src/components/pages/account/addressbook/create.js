import { Button, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import FormAddressBook from "./form";
import { IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useAddressBook } from "@/hooks/useAddressBook";
import toast from "react-hot-toast";
import { addressBookSchema } from "@/validations/account";

export default function CreateAddressBookBtn(){
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)

    const {create} = useAddressBook()

    const formik = useFormik({
        initialValues: {
            "name": "",
            "region": 1,
            "district": 676,
            "ward": 11027,
            "address": "",
            "receiver": "",
            "phone": "",
            "default": false,
            "default_note":""
        },
        validationSchema: addressBookSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await create(values)
                setOpen(false)
                toast.success('Thêm mới địa chỉ thành công!', {
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
                variant="contained" 
                size="small"
                startIcon={<IconPlus />}
                onClick={()=>setOpen(true)}
            >
                Thêm mới
            </Button>
            <Dialog
                open={open}
                onClose={()=> setOpen(false)}
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle>
                    <Typography color="primary.main" fontSize={18} fontWeight={700} letterSpacing={-1}>
                        Tạo địa chỉ nhận hàng mới
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <FormAddressBook formik={formik} loading={loading}  btnText="Tạo mới"/>
                </DialogContent>
            </Dialog>
        </>
    )
}