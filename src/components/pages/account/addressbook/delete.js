import { useAddressBook } from "@/hooks/useAddressBook";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function DeleteAddressBookBtn({data}){
    const [loading,setLoading] = useState(false)
    const {deleteAddress} = useAddressBook()

    const handleClick = async () => {

        if(data.default){
            Swal.fire({
                icon: 'warning',
                title: 'Không thể xóa địa chỉ mặc định',
                text: "Vui lòng đặt địa chỉ khác làm mặc định trước khi xóa địa chỉ này"
            })
            return
        }

        const request = await Swal.fire({
            icon: 'warning',
            title: 'Warning !!',
            text: `Bạn có chắc chắn muốn xóa địa chỉ ${data?.name}`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#d30000',
            cancelButtonColor: '#999',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Quay lại'
        })

        if(!request?.isConfirmed) return

        setLoading(true)
        try {
            await deleteAddress(data?.id)
            toast.success('Xóa địa chỉ thành công!', {
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
                color="error"
                onClick={handleClick}
            >
                Xóa
            </LoadingButton>
        </>
    )
}