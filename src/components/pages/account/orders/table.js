import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useOrder } from "@/hooks/useOrder";
import LoadingSection from "@/components/screen/loadingSection";
import OrderRow from './row';
import CartEmpty from '@/components/ui/cartEmpty';
import { useEffect } from 'react';

export default function OrderTable(){
    
    const {orders, isLoading, mutate} = useOrder()

    useEffect(()=>{
        mutate()
    },[])

    if(isLoading) return <LoadingSection />

    if(orders?.length < 1) return <CartEmpty text="Bạn chưa có đơn hàng nào" />

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="orders list">
                <TableHead sx={{bgcolor: '#f2f2f2'}}>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell>Số tiền</TableCell>
                        <TableCell align="center">Tình trạng</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((item,key) => <OrderRow item={item} key={key} />)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}