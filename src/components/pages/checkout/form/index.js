import { Stack, Typography } from "@mui/material";
import FormReceiverInfo from "./form";
import PaymentMethod from "./paymentMethod";
import { useAuth } from "@/hooks/useAuth";
import AddressBookChoose from "./addressBook";

export default function CheckOutForm({formik}){

    const { userData } = useAuth()

    return(
        <Stack spacing={3}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h2" component={"h2"} sx={styles.title}>
                    Thông tin vận chuyển
                </Typography>
                {userData && <AddressBookChoose formik={formik}/>}
            </Stack>
            <FormReceiverInfo formik={formik}/>
            <Typography variant="h2" component={"h2"} sx={styles.title}>
                Hình thức thanh toán
            </Typography>
            <PaymentMethod />
        </Stack>
    )
}

const styles = {
    title: {
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: -1,
        color: '#333333'
    }
}