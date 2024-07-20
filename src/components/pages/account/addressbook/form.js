import DkhInput from "@/components/ui/input";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import SelectAddress from "@/components/address/select";

export default function FormAddressBook({formik,loading,btnText}){

    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <DkhInput
                    id="name"
                    name="name"
                    placeholder="Nhập tên ghi nhớ VD: Địa chỉ nhà"
                    inputLabel="Tên ghi nhớ"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <DkhInput
                    id="receiver"
                    name="receiver"
                    placeholder="Nhập tên người nhận hàng VD: Mr Khoa"
                    inputLabel="Tên người nhận hàng"
                    value={formik.values.receiver}
                    onChange={formik.handleChange}
                    error={formik.touched.receiver && Boolean(formik.errors.receiver)}
                    helperText={formik.touched.receiver && formik.errors.receiver}
                />
                <DkhInput
                    id="phone"
                    name="phone"
                    placeholder="Nhập số điện thoại nhận hàng"
                    inputLabel="Số điện thoại liên hệ"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <Typography variant="body2">
                    Địa chỉ nhận hàng
                </Typography>
                <SelectAddress formik={formik} />
                <DkhInput
                    id="address"
                    name="address"
                    placeholder="Nhập địa chỉ chi tiết"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />

                <DkhInput
                    multiline
                    maxRows={4}
                    id="default_note"
                    name="default_note"
                    inputLabel="Lưu ý mặc định"
                    placeholder="Nhập lưu ý mặc định shipper khi ship đến địa chỉ này | VD: giao giờ hành chính"
                    value={formik.values.default_note}
                    onChange={formik.handleChange}
                />

                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={loading}
                >
                    {btnText}
                </LoadingButton>
            </Stack>
        </form>
    )
}