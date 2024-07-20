import SelectAddress from "@/components/address/select";
import { Box, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";

export default function FormReceiverInfo({ formik }) {
    return (
        <Stack spacing={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={"space-between"} alignItems={"flex-start"} spacing={{xs: 2,md: 1}}>
                <TextField
                    id="receiver"
                    name="receiver"
                    hiddenLabel
                    variant="outlined"
                    sx={styles.input}
                    placeholder="Họ tên người nhận"
                    fullWidth
                    value={formik.values.receiver}
                    onChange={formik.handleChange}
                    error={formik.touched.receiver && Boolean(formik.errors.receiver)}
                    helperText={formik.touched.receiver && formik.errors.receiver}
                />
                <TextField
                    id="phone"
                    name="phone"
                    hiddenLabel
                    variant="outlined"
                    sx={styles.input}
                    placeholder="Số điện thoại liên hệ"
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
            </Stack>
            <TextField
                id="email"
                name="email"
                hiddenLabel
                variant="outlined"
                sx={styles.input}
                placeholder="Địa chỉ email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                id="address"
                name="address"
                hiddenLabel
                variant="outlined"
                sx={styles.input}
                placeholder="Địa chỉ giao hàng, VD: Chung cư The Pride Tố Hữu"
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
            />
            <Box py={1}>
                <SelectAddress formik={formik} borderRadius={4}/>
            </Box>
            <TextField
                id="note"
                name="note"
                hiddenLabel
                variant="outlined"
                sx={styles.input}
                placeholder="Ghi chú đơn hàng, VD: Giao giờ hành chính"
                fullWidth
                multiline
                value={formik.values.note}
                onChange={formik.handleChange}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
            />
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Lưu vào sổ địa chỉ đề dùng cho lần mua hàng tiếp theo" /> */}
        </Stack>
    )
}

const styles = {
    input: {
        '& fieldset': {
            borderRadius: 4
        }
    }
}