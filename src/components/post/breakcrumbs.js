import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function PostCategoryBreadCrumb({link,title}){
    return(
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link color="inherit" href="/">
                Trang chủ
            </Link>,
            <Link
                href={link}
            >
                {title}
            </Link>
        </Breadcrumbs>
    )
}