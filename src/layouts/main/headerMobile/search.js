// import SearchFormProduct from "@/components/layouts/main/header/search";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";
import SearchModal from "../header/search/modal";

export default function SearchIconMobile(){

    const [open,setOpen] = useState(false)

    return(
        <>
            <Button sx={{minWidth: '40px'}} onClick={()=>setOpen(true)}>
                <IconSearch color="#fff" size={28}/>
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="search-product-title"
                aria-describedby="search-product-description"
                maxWidth={"lg"}
                fullScreen
            >
                <DialogTitle
                    sx={{bgcolor: 'secondary.main'}}
                >
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="body1" fontWeight={600} color="#fff">Tìm kiếm sản phẩm</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <IconX color="#fff" size={16}/>
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent
                    sx={{overflowX: 'hidden', mt: 2, p: 2}}
                >
                    <SearchModal open={open} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    )
}