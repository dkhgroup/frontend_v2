import { Link, Stack, Typography } from "@mui/material";

const menu = [
    {
        id: 1,
        title: 'Về chúng tôi',
        link: '/ve-dkh-group'
    },
    {
        id: 2,
        title: 'Tin tức - báo chí',
        link: '/category/blog'
    },
    {
        id: 4,
        title: 'Tuyển dụng',
        link: '/category/tuyen-dung'
    }

]

export default function FooterInfotSection2(){

    return(
        <Stack spacing={2}>
            <Typography variant="h3" component={"h2"} color={"#fff"} fontSize={16} fontWeight={700}>
                CÂU CHUYỆN DKHGROUP
            </Typography>
            <Stack spacing={1}>
                {menu.map(item =>
                    <Link href={item.link} key={item.id} underline="none">
                        <Typography variant="body2" color={"#fff"}>
                            {item.title}
                        </Typography>
                    </Link>
                )}
            </Stack>
        </Stack>
    )
}