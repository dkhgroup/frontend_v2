import { MenuItem, Select, Stack, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import QtyChange from "./qty";
import FormatCurrency from "@/components/format/money";
import RemoveCartItem from "./remove";
import { cdnImage } from "@/components/ui/cdnImage";
import { useCart } from "@/hooks/useCart";

function getImageAttribute(id,data){
    let result;
    data.map(item => {
        if(item.property.id !== id) return
        result = item.thumbnail.url
    })

    return result
}

export default function CartItem({item,setLoading}){

    const getThumbnail = getImageAttribute(item.property.id,item.san_pham.attributes)

    const {changeProperty} = useCart()

    const match = useMediaQuery('(max-width:720px)')

    const handleChangeAttribute = async (event) => {

        // sử lý sự kiện loading sau
        // setLoading(true)
        try {
            await changeProperty({property: event.target.value},item.id)
        } catch (error) {
            console.log("🚀 ~ handleChangeAttribute ~ error:", error)
        }
        // setLoading(false)
    }

    if(match) return(
        <Grid container spacing={2} alignItems={"center"}>
            <Grid xs={12} md={6} order={1}>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Image
                        src={cdnImage(getThumbnail)}
                        width={60}
                        height={60}
                        alt="san pham"
                    />
                    <Stack spacing={1} justifyContent={"flex-start"} alignItems={"flex-start"}>
                        <Typography variant="body1" fontSize={15} fontWeight={700} color="#555" letterSpacing={-1}>
                            {item?.san_pham?.name}
                        </Typography>
                        <Typography variant="body1" sx={styles.price}>
                            <FormatCurrency data={+item?.san_pham?.price} />
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={5} md={2.5} order={{xs: 3, md: 2}}>
                <QtyChange current={item.qty} setLoading={setLoading} item={item}/>
            </Grid>
            <Grid xs={5.5} md={2.6} order={{xs: 2, md: 3}}>
                <Select
                    id="selectAttributes"
                    value={item?.property?.id}
                    onChange={handleChangeAttribute}
                    sx={styles.select}
                >
                    {item?.san_pham?.attributes?.length > 0 && item?.san_pham?.attributes?.map(item =>
                        <MenuItem value={item?.property?.id} key={item.id}>
                            {item?.property?.name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid xs={1} md={0.5} order={4}>
                <RemoveCartItem item={item}/>
            </Grid>
        </Grid>
    )
    
    return(
        <Grid container spacing={2} alignItems={"flex-end"}>
            <Grid xs={12} md={6} order={1}>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Image
                        src={cdnImage(getThumbnail)}
                        width={60}
                        height={60}
                        alt="san pham"
                    />
                    <Stack spacing={1} justifyContent={"flex-start"} alignItems={"flex-start"}>
                        <Typography variant="body1" fontSize={15} fontWeight={700} color="#555" letterSpacing={-1}>
                            {item?.san_pham?.name}
                        </Typography>
                        <Select
                            id="selectAttributes"
                            value={item?.property?.id}
                            onChange={handleChangeAttribute}
                            sx={styles.select}
                        >
                            {item?.san_pham?.attributes?.length > 0 && item?.san_pham?.attributes?.map(item =>
                                <MenuItem value={item?.property?.id} key={item.id}>
                                    {item?.property?.name}
                                </MenuItem>
                            )}
                        </Select>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={5} md={2.5} order={{xs: 3, md: 2}}>
                <QtyChange current={item.qty} setLoading={setLoading} item={item}/>
            </Grid>
            <Grid xs={5.5} md={2.6} order={{xs: 2, md: 3}} minHeight={45}>
                <Stack height={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Typography variant="body1" sx={styles.price}>
                        <FormatCurrency data={+item?.san_pham?.price} />
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={1} md={0.5} order={4}>
                <RemoveCartItem item={item}/>
            </Grid>
        </Grid>
    )
}

const styles = {
    lable: {
        color: '#888'
    },
    lable1: {
        color: '#888',
        textAlign: 'center'
    },
    select: {
        borderRadius: 3,
        py: 0,
        bgcolor: '#F0F0F0',
        minWidth: 150,
        borderColor: '#888',
        '& .MuiSelect-select': {
            p: '5px 20px !important'
        }
    },
    price: {
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: -1,
        color: 'primary.main',
        lineHeight: 1,
        textAlign: {
            xs: 'left',
            md: 'center'
        }
    },
}