import CreateAddressBookBtn from "@/components/pages/account/addressbook/create";
import AddressBookItem from "@/components/pages/account/addressbook/item";
import SeoMetaTag from "@/components/pageConfig/meta";
import LoadingScreen from "@/components/screen/loading";
import { useAddressBook } from "@/hooks/useAddressBook";
import AccountLayout from "@/layouts/account";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { globalConfig } from "@/theme/globalConfig";

export default function AddressBookPage({navbar,footer}){

    const {addressBooks,isLoading} = useAddressBook()

    return(
        <AccountLayout navbar={navbar} footer={footer}>
            <Stack spacing={3}>
                <SeoMetaTag
                    title="Số địa chỉ | DKH Group Website"
                />
                <Stack direction={"row"} spacing={2}>
                    <Box flex={1}>
                        <Typography mb={3} variant="h1" component={"h1"} fontSize={24} fontWeight={700} letterSpacing={-1.5}>
                            Số địa chỉ
                        </Typography>
                    </Box>
                    <Box minWidth={100}>
                        <CreateAddressBookBtn />
                    </Box>
                </Stack>

                {isLoading && <LoadingScreen />}

                {addressBooks && 
                    <Stack divider={<Divider />} spacing={2}>
                        {addressBooks?.map(item => 
                            <AddressBookItem key={item?.id} datas={item}/>
                        )}
                    </Stack>
                }
            </Stack>
        </AccountLayout>
    )
}

export async function getStaticProps() {
  
    const urlNavbar = `${globalConfig.api_url}/menus/${globalConfig.menuId}?nested&populate=*`
    const urlFooter = `${globalConfig.api_url}/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`
    const getNavBar = await fetch(urlNavbar)
    const getFooter = await fetch(urlFooter)
    const navbar = await getNavBar.json()
    const footer = await getFooter.json()

   
    return {
      props: {
        navbar,
        footer
      },
      revalidate: globalConfig.revalidateTime,
    }
}