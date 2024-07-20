import { IconButton, Stack, Typography } from "@mui/material";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function CartNumberSelect({formik}){

    const minus = () => {
        if((formik.values.qty - 1) < 1){
            formik.setFieldValue('qty', 1)
        } else {
            formik.setFieldValue('qty', formik.values.qty - 1)
        }
    }
    return(
        <Stack 
            direction={"row"} 
            justifyContent={"space-between"} 
            alignItems={"center"}
            width={200}
            border={1}
            borderRadius={5}
            py={0.2}
        >
            <IconButton onClick={minus}>
                <IconMinus size={15}/>
            </IconButton>
            <Typography variant="body2" flex={1} textAlign={"center"} fontWeight={700}>
                {formik.values.qty}
            </Typography>
            <IconButton onClick={() =>formik.setFieldValue('qty', formik.values.qty + 1)}>
                <IconPlus size={15}/>
            </IconButton>
        </Stack>
    )
}