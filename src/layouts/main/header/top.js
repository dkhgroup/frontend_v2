import { useAuth } from "@/hooks/useAuth";
import { globalConfig } from "@/theme/globalConfig";
import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

const menu = [
    {
        id: 1,
        title: 'Về DKH Group',
        link: '/ve-dkh-group'
    },
    {
        id: 2,
        title: 'Tin tức',
        link: '/category/blog'
    }
]

export default function TopHeader(){

    const {userData} = useAuth()

    return(
        <Box bgcolor={"secondary.main"} py={2} display={{xs: 'none', lg: 'block'}}>
            <Container maxWidth={globalConfig.maxWidth}>
                <Grid container spacing={2}>

                    <Grid xs={12} lg={6}>
                        <Typography variant="body2" fontWeight={600} letterSpacing={-.5} color="#fafafa" lineHeight={1} fontSize={13}>
                            Địa chỉ: CT2 tòa nhà The Pride - khu đô thị mới An Hưng - phường Hà Đông - Thành phố Hà Nội
                        </Typography>
                    </Grid>

                    <Grid xs={6} lg={6}>
                        <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} gap={1.5} divider={<Divider orientation="vertical" flexItem />}>
                            {menu.map(item =>
                                <Link href={item.link} key={item.id}>
                                    <Typography variant="body2" fontWeight={600} lineHeight={1} fontSize={13} sx={styles.item}>
                                        {item.title}
                                    </Typography>
                                </Link>
                            )}

                            {/* <Link 
                                href={userData ? '/account' : '/login'}
                            >
                                <Typography variant="body2" fontWeight={600} lineHeight={1} fontSize={13} sx={styles.item}>
                                    {userData ? `Xin chào ! ${userData?.fullname}` : "Đăng nhập"}
                                </Typography>
                            </Link> */}
                        </Stack>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}

const styles = {
    item: {
        color: '#fafafa',
        transition: '.3s all',
        "&:hover": {
            color: 'primary.main'
        }
    }
}