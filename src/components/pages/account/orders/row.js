import FormatCurrency from "@/components/format/money";
import { TableCell, TableRow, Typography } from "@mui/material";
import DetailBtn from "./detail";
import OrderItemStatus from "./status";

export default function OrderRow({item}){
    return(
        <TableRow
            sx={{ 
                bgcolor: '#ffffff',
                '&:last-child td, &:last-child th': { border: 0 } 
            }}
        >
            <TableCell component="th" scope="row">
                <Typography fontWeight={600}>
                    {item.order_code}
                </Typography>
            </TableCell>
            <TableCell>
                sản phẩm
            </TableCell>
            <TableCell>
                <FormatCurrency data={item.subtotal} />
            </TableCell>
            <TableCell align="center">
                <OrderItemStatus status={item.status} />
            </TableCell>
            <TableCell align="center">
                <DetailBtn item={item} />
            </TableCell>
        </TableRow>
    )
}