import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useOrder } from "@/hooks/useOrder";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
export default function CancelOrder({data,setOpen}){

    const [loading,setLoading] = useState(false)

    const {cancelOrder} = useOrder()

    const handleClick = async () => {
        
        const confirm = await Swal.fire({
            icon: 'warning',
            title: 'Xác nhận huỷ dơn hàng',
            text: `Bạn có chắc chắn muốn huỷ đơn hàng ID: ${data?.order_code}`,
            showCancelButton: true,
            cancelButtonText: 'Không huỷ',
            confirmButtonText: 'Huỷ đơn',
            cancelButtonColor: '#00DEDE',
            confirmButtonColor: '#DE0000'
        })
        
        if(!confirm.isConfirmed) return
        
        setLoading(true)

        try {
            const check = await cancelOrder(data.id)
            setOpen(false)
            toast.success('Huỷ đơn hàng thành công!', {
                duration: 4000,
                position: 'top-right'
            });
        } catch (error) {
            console.log("🚀 ~ handleClick ~ error:", error)
        }
        setLoading(false)
    }

    return(
        <LoadingButton
            loading={loading}
            variant="contained"
            size="small"
            startIcon={<HighlightOffIcon />}
            onClick={handleClick}
        >
            Huỷ đơn
        </LoadingButton>
    )
}