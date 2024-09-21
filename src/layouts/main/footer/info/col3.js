import { useStaticPage } from "@/hooks/useStaticPage";
import { Link, Stack, Typography } from "@mui/material";

export default function FooterInfotSection3(){

    const {listPage,isLoading} = useStaticPage()

    if(isLoading) return

    return(
        <Stack spacing={2}>
            <Typography variant="h3" component={"h2"} color={"#fff"} fontSize={16} fontWeight={700}>
                CHÍNH SÁCH
            </Typography>
            <Stack spacing={1}>
                {listPage && listPage?.data?.map(item =>
                    <Link
                        href={`/${item.attributes?.slug}`}
                        key={item.id}
                        underline="none"
                    >
                        <Typography variant="body2" color={"#fff"}>
                            {item.attributes?.title}
                        </Typography>
                    </Link>
                )}
            </Stack>
        </Stack>
    )
}