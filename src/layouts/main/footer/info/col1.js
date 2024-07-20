import { useContact } from "@/hooks/useContact";
import { Stack, Typography } from "@mui/material";

export default function FooterInfotSection1(){

    const {contact, isLoading} = useContact()

    if(isLoading) return

    return(
        <Stack spacing={2}>
            <Typography variant="h3" component={"h2"} color={"#fff"} fontSize={16} fontWeight={700}>
                ĐỊA CHỈ LIÊN HỆ
            </Typography>
            <Stack spacing={1}>
                <Typography variant="body2" color={"#fff"}>
                    <strong>Văn phòng:</strong>  {contact?.data?.attributes?.address_office || 'P.A8 - CT2 tòa nhà The Pride - đường Tố Hữu, phường La Khê, quận Hà Đông, thành phố Hà Nội'}
                </Typography>
                <Typography variant="body2" color={"#fff"}>
                    <strong>Xưởng sản xuất:</strong>  {contact?.data?.attributes?.address_factory || 'Thạch Thất, Hà Nội'}
                </Typography>
            </Stack>
        </Stack>
    )
}