import { useAddressBook } from "@/hooks/useAddressBook";
import { Button, Dialog, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { IconAddressBook } from "@tabler/icons-react";
import { useState } from "react";
import AddressBookChooseItem from "./addressBookItem";

export default function AddressBookChoose({formik}){

    const [open,setOpen] = useState(false)

    const {addressBooks, isLoading} = useAddressBook()

    return(
        <>
            <Button 
                variant="text" 
                startIcon={<IconAddressBook size={18}/>}
                onClick={() => setOpen(true)}
            >
                Sổ địa chỉ
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth
            >
                <DialogTitle sx={{bgcolor: 'secondary.main'}}>
                    <Typography variant="body1" fontWeight={700} color="#fff">
                        Sổ địa chỉ
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {addressBooks && 
                        <Stack divider={<Divider />} spacing={2}>
                            {addressBooks?.map(item => 
                                <AddressBookChooseItem key={item?.id} datas={item} formik={formik} setOpen={setOpen}/>
                            )}
                        </Stack>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}