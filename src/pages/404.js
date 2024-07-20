import SeoMetaTag from "@/components/pageConfig/meta";
import { globalConfig } from "@/theme/globalConfig";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function NotFoundPage() {
    return (
        <>
            <SeoMetaTag
                title="DKH Group Not Found"
                description="DKH Group không tìm thấy nội dung bạn đang truy cập"
            />
            <Container maxWidth={globalConfig.maxWidth}>
                <Stack minHeight={500} justifyContent={"center"} alignItems={"center"} spacing={2}>
                    <Image
                        src={'/assets/not-found.svg'}
                        width={350}
                        height={280}
                        alt="DKH Group Not Found"
                    />
                    <Typography variant="h1" component={"h1"} fontSize={18} fontWeight={700} textAlign={"center"}>
                        DKH Group Not Found
                    </Typography>
                    <Typography variant="body1" fontWeight={300} textAlign={"center"}>
                        Xin lỗi ! Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị xoá bởi admin, vui lòng Quay lại trang chủ để xem các nội dung khác
                    </Typography>
                </Stack>
            </Container>
        </>
    )
}