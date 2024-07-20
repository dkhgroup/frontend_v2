import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export default function BreakCrumbDkh({loops,text}){
    return(
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link href="/">
                <Typography variant="body2">Trang chủ</Typography>
            </Link>
            {loops && loops?.map((item,key) =>
                <Link href={item?.link} key={key}>
                    <Typography variant="body2">
                        {item?.text}
                    </Typography>
                </Link>
            )}
            <Typography variant="body2">
                {text}
            </Typography>
        </Breadcrumbs>
    )
}