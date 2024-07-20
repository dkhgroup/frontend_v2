import { CircularProgress, IconButton, InputBase, Stack } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

export default function SearchProductInput({...props}){
    return(
        <form onSubmit={props.formik.handleSubmit} target="search-form">
            <Stack 
                direction={"row"} 
                justifyContent={"space-between"} 
                alignItems={"center"}
                bgcolor={"#f8f8f8"}
                pr={2}
                borderRadius={2}
            >
                <InputBase
                    name="keyword"
                    id="keyword"
                    value={props.formik.values.keyword}
                    onChange={props.formik.handleChange}
                    sx={{ ml: 1, flex: 1 }}
                    disabled={props?.disableInput}
                    placeholder={props?.datas?.place_holder || "Nhập từ khóa tìm kiếm sản phẩm"}
                />
                <IconButton type="submit" id="btn-submit-search-form">
                    {props?.loading ? <CircularProgress size={20} /> : <IconSearch />}
                </IconButton>
            </Stack>
        </form>
    )
}