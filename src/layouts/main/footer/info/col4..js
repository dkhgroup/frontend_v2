import { useDocs } from "@/hooks/useDocs";
import { Link, Stack, Typography } from "@mui/material";

export default function FooterInfotSection4(){

    const {listDocs,isLoading} = useDocs()

    if(isLoading) return

    return(
        <Stack spacing={2}>
            <Typography variant="h3" component={"h2"} color={"#fff"} fontSize={16} fontWeight={700}>
                TÀI LIỆU
            </Typography>
            <Stack spacing={1}>
                {listDocs && listDocs?.data?.map(item =>
                    <Link
                        href={`/docs/${item?.attributes?.slug}_id=${item.id}`} 
                        key={item.id}
                        underline="none"
                    >
                        <Typography variant="body2" color={"#fff"}>
                            {item?.attributes?.title}
                        </Typography>
                    </Link>
                )}
            </Stack>
        </Stack>
    )
}