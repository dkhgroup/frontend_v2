import { Button, Chip, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import DeleteAddressBookBtn from "./delete";
import SetDefaultAddressBookBtn from "./setDefault";
import EditAddressBookBtn from "./edit";

export default function AddressBookItem({datas}){
    return(
        <Grid container spacing={2}>
            <Grid xs={12} md={7}>
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
                            {datas?.address}
                        </Typography>
                        <Typography variant="body2">
                            {datas?.ward?.name}, {datas?.district?.name}, {datas?.region?.name}
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={12} md={5}>
                <Stack spacing={1} direction={"row"} justifyContent={"flex-end"}>
                    {!datas?.default && <SetDefaultAddressBookBtn data={datas} />}
                    <EditAddressBookBtn datas={datas} />
                    <DeleteAddressBookBtn data={datas} />
                </Stack>
            </Grid>
        </Grid>
    )
}