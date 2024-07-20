import { useAddressBook } from "@/hooks/useAddressBook";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function SetDefaultAddressBookBtn({data}){
    const [loading,setLoading] = useState(false)
    const {setDefaultAddress} = useAddressBook()

    const handleClick = async () => {
        const request = await Swal.fire({
            icon: 'warning',
            title: 'Warning !!',
            text: `Bạn có chắc chắn muốn đặt địa chỉ ${data?.name} là địa chỉ mặc định`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#d30000',
            cancelButtonColor: '#999',
            confirmButtonText: 'OK',
            cancelButtonText: 'Quay lại'
        })

        if(!request?.isConfirmed) return

        setLoading(true)
        try {
            await setDefaultAddress(data?.id)
            toast.success('Đặt địa chỉ mặc định thành công!', {
                duration: 4000,
                position: 'top-right'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ops,...',
                text: error?.response?.data?.message || "Có lỗi, vui lòng F5 trang và thử lại"
            })
        }
        setLoading(false)

    }

    return(
        <>
            <LoadingButton
                variant="outlined"
                loading={loading}
                size="small"
                color="info"
                onClick={handleClick}
            >
                Đặt mặc định
            </LoadingButton>
        </>
    )
}