import * as yup from 'yup'
const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/

const checkoutValidation = yup.object({
    receiver: yup
        .string()
        .required('Vui lòng nhập họ tên người nhận'),
    phone: yup
        .string()
        .matches(phoneRegExp,'Vui lòng nhập số điện thoại theo định dạng 10 số vd: 0968686868')
        .required('Vui lòng nhập số điện thoại'),
    address: yup
        .string()
        .required('Vui lòng nhập địa chỉ nhận hàng'),
})

export {
    checkoutValidation
}