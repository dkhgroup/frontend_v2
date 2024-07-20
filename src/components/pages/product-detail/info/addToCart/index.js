import { Button, Stack } from "@mui/material";
import CartNumberSelect from "./numBtn";
import { IconShoppingBagExclamation } from "@tabler/icons-react";
import { LoadingButton } from "@mui/lab";

export default function AddtoCartGroup({formik,selectAttribute,loading}){
    
    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack 
                direction={{
                    xs: "column",
                    md: 'row'
                }}
                alignItems={{
                    xs: 'flex-start',
                    md: "center"
                }}
                spacing={1}
            >
                <CartNumberSelect formik={formik}/>

                {!selectAttribute &&
                    <Button 
                        variant="contained" 
                        color="secondary"
                        startIcon={<IconShoppingBagExclamation size={16} />}
                        fullWidth
                    >
                        Vui lòng chọn màu sắc sản phẩm
                    </Button>
                }

                {selectAttribute &&
                    <LoadingButton
                        variant="contained" 
                        color="secondary"
                        startIcon={<IconShoppingBagExclamation size={16} />}
                        fullWidth
                        type="submit"
                        loading={loading}
                    >
                        Thêm vào giỏ hàng
                    </LoadingButton>
                }
            </Stack>
        </form>
    )
}