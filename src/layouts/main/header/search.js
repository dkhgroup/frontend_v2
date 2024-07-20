import { Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import SearchModal from "./search/modal";

export default function SearchBoxHeader() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Stack
                direction={"row"}
                bgcolor={"#f2f2f2"}
                px={2}
                py="10px"
                minWidth={"220px"}
                borderRadius={"30px"}
                gap={1.5}
                alignItems={"center"}
                sx={{ cursor: 'pointer' }}
                onClick={()=>setOpen(true)}
            >
                <IconSearch color="#666"/>
                <Typography variant="body2" component={"span"} color="#666666" fontWeight={600} fontSize={14}>
                    Tìm kiếm sản phẩm ...
                </Typography>
            </Stack>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="search-product-title"
                aria-describedby="search-product-description"
                maxWidth={"lg"}
                disableAutoFocus
                disableScrollLock
            >
                <DialogContent
                    sx={{
                        overflowX: 'hidden',
                        width: 1200
                    }}
                >
                    <SearchModal open={open} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    )
}