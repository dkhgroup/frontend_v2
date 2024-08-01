import { Stack, Typography } from "@mui/material";

export default function FooterAboutUsSection1({contact}){

    return(
        <Stack spacing={1}>
            <Typography variant="h2" component={"h2"} color={"#fff"}>
                {contact?.data?.attributes?.footer_name}
            </Typography>
            <Typography variant="body2" color={"#fff"}>
                {contact?.data?.attributes?.footer_description}
            </Typography>
        </Stack>
    )
}