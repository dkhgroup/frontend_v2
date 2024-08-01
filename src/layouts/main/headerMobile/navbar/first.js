import { useContact } from "@/hooks/useContact";
import { Box, Stack, Typography, Link } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FirstItemNavMobile({ setOpen, showChild, setShowChild,navbar }) {

    const router = useRouter()

    const { contact, isLoading } = useContact()

    const [menus, setMenus] = useState()

    const handleClick = (url, id, length) => {
        if(length > 0){
            setShowChild(id)
            return
        }
        router.push(url)
        setOpen(false)
    }

    useEffect(() => {
        setMenus(navbar?.data?.attributes?.items?.data)
    }, [isLoading])

    return (
        <Box
            width={350}
            p={3}
            sx={{
                overflowX: 'hidden'
            }}
            position={"relative"}
        >
            <Stack
                spacing={4}
                className={`mobile-nav ${showChild !== 0 && "transit"}`}
            >
                <Image
                    src="/assets/ngang.svg"
                    width={200}
                    height={36}
                    alt="DKH Group Logo"
                />
                <Stack spacing={2}>
                    {menus && menus?.map(item =>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            px={2}
                            py={1.5}
                            bgcolor={router.asPath === item?.attributes?.url ? 'primary.main' : "#f2f2f2"}
                            borderRadius={1.5}
                            onClick={() =>
                                handleClick(
                                    item?.attributes?.url,
                                    item.id,
                                    item?.attributes?.children?.data?.length
                                )
                            }
                            key={item.id}
                        >
                            <Typography
                                variant="body1"
                                fontWeight={router.asPath === item?.attributes?.url ? 700 : 500}
                                color={router.asPath === item?.attributes?.url ? '#fff' : "#222"}
                            >
                                {item?.attributes?.title}
                            </Typography>
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                                bgcolor={"#fff"}
                                width={30}
                                height={30}
                                borderRadius={10}
                            >
                                <IconChevronRight size={15} />
                            </Stack>
                        </Stack>
                    )}
                </Stack>
                <Stack flex={1} spacing={2}>
                    <Typography variant="body2">
                        {contact?.data?.attributes?.footer_description || "DKH Group được thành lập với một mục đích rất rõ ràng: chúng tôi muốn mang đến cho thị trường những sản phẩm về đồ da, thời trang và dược phẩm phù hợp nhu cầu với chất lượng tốt nhất và giá cả hợp lí nhất."}
                    </Typography>

                    <Stack spacing={0}>
                        <Typography variant="body2" component={"span"}>
                            Hotline
                        </Typography>

                        {contact && contact?.data?.attributes?.Hotline?.map(item =>
                            <Link href={`tel:${item?.phone}`} key={item.id}>
                                <Typography fontWeight={700} component={"span"}>
                                    {item?.phone} - {item?.text}
                                </Typography>
                            </Link>
                        )}
                    </Stack>

                    <Stack spacing={0}>
                        <Typography variant="body2" component={"span"}>
                            Email
                        </Typography>
                        {contact && contact?.data?.attributes?.Email?.map(item =>
                            <Link href={`mailto:${item.email}`} key={item.id}>
                                <Typography fontWeight={700} component={"span"}>
                                    {item.email}
                                </Typography>
                            </Link>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}