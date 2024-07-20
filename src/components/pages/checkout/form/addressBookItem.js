import { Button, Chip, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export default function AddressBookChooseItem({datas,formik,setOpen}){

    const handleClick = () => {
        formik.setFieldValue('fullname',datas?.receiver)
        formik.setFieldValue('phone',datas?.phone)
        formik.setFieldValue('address',datas?.address)
        formik.setFieldValue('region',datas?.region?.id)
        formik.setFieldValue('district',datas?.district?.id)
        formik.setFieldValue('ward',datas?.ward?.id)
        formik.setFieldValue('note',datas?.default_note)
        setOpen(false)
    }

    return(
        <Grid container spacing={2} alignItems={"center"}>
            <Grid xs={12} md={9}>
                <Stack spacing={1.5}>
                    <Stack 
                        direction={"row"} 
                        spacing={1.5}
                        alignItems={"center"}
                    >

                        <Typography fontSize={16} fontWeight={500}>
                            {datas?.name}
                        </Typography>
                        <Typography fontSize={12} fontWeight={500}>
                            |
                        </Typography>
                        <Typography fontSize={15} fontWeight={400}>
                           ( {datas?.receiver} - {datas?.phone} )
                        </Typography>
                        {datas?.default && <Chip size="small" label="Mặc định" color="primary" />}
                    </Stack>
                    <Stack spacing={0.5}>
                        <Typography variant="body2">
                            {datas?.address} {datas?.ward?.name}, {datas?.district?.name}, {datas?.region?.name}
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={12} md={3}>
                <Stack spacing={1} direction={"row"} justifyContent={"flex-end"}>
                    <Button variant="contained" size="small" onClick={handleClick}>
                        Dùng địa chỉ này
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}