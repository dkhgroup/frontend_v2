import CreateAddressBookBtn from "@/components/pages/account/addressbook/create";
import AddressBookItem from "@/components/pages/account/addressbook/item";
import SeoMetaTag from "@/components/pageConfig/meta";
import LoadingScreen from "@/components/screen/loading";
import { useAddressBook } from "@/hooks/useAddressBook";
import AccountLayout from "@/layouts/account";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

export default function AddressBookPage(){

    const {addressBooks,isLoading} = useAddressBook()

    return(
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
    )
}

AddressBookPage.Layout = AccountLayout