import FormatCurrency from "@/components/format/money";
import { Stack, Typography } from "@mui/material";

export default function ProductDetailPrice({data}){
    return(
        <Stack direction={"row"} alignItems={"flex-end"} spacing={2}>
            <Typography variant="h4" component={"h4"} sx={styles.price}>
                <FormatCurrency data={data?.price || 0} />
            </Typography>
            {data?.oldPrice && 
                <Typography variant="h4" component={"h4"} sx={styles.oldPrice}>
                    <FormatCurrency data={data?.oldPrice || 0} />
                </Typography>
            }
        </Stack>
    )
}

const styles = {
    price: {
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: -1,
        color: 'primary.main',
        lineHeight: 1
    },
    oldPrice: {
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: -1,
        textDecoration: 'line-through',
        color: '#666',
        lineHeight: 1
    }
}