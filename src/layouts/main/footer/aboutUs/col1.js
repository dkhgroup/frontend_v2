import { useContact } from "@/hooks/useContact";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function FooterAboutUsSection1(){

    const {contact, isLoading} = useContact()

    if(isLoading) return

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