import { useNavbar } from "@/hooks/useNavbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import WestIcon from '@mui/icons-material/West';

export default function SecondItemNavbar({setOpen,setShowChild,showChild}){

    const router = useRouter()

    const { navbar } = useNavbar()
    const data = navbar?.data?.attributes?.items?.data
    
    const handleClick = (url) => {
        router.push(url)
        setOpen(false)
    }

    return(
        <>
            {data && data?.map(item =>
                <Stack 
                    spacing={2}
                    className={`nav-child ${showChild === item.id ? 'transit' : ''}`}
                    key={item.id}
                    p={3}
                >
                    <Box>
                        <Button
                            startIcon={<WestIcon />}
                            onClick={() => setShowChild(0)}
                        >
                            Quay lại
                        </Button>
                    </Box>
                    {item?.attributes?.children?.data?.length > 0 && item?.attributes?.children?.data?.map(item =>
                        <Stack
                            key={item.id}
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            px={2}
                            py={1.5}
                            bgcolor={router.asPath === item?.attributes?.url ? 'primary.main' : "#f2f2f2"}
                            borderRadius={1.5}
                            onClick={() => handleClick(item?.attributes?.url)}

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
            )}
        </>
    )
}