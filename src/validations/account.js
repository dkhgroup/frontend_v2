import * as yup from 'yup'
const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/

const addressBookSchema = yup.object({
    name: yup
        .string()
        .required('Vui lòng nhập Tên ghi nhớ'),
    receiver: yup
        .string()
        .required('Vui lòng nhập Tên người nhận hàng'),
    address: yup
        .string()
        .required('Vui lòng nhập địa chỉ chi tiết'),
    phone: yup
        .string()
        .matches(phoneRegExp,'Vui lòng nhập số điện thoại theo định dạng 10 số vd: 0968686868')
        .required('Vui lòng nhập số điện thoại'),
})

export {
    addressBookSchema
}