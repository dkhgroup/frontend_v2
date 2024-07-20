import * as yup from 'yup'

const searchProducts = yup.object({
    keyword: yup
        .string()
        .required('Vui lòng nhập từ khóa tìm kiếm sản phẩm'),
})

export {
    searchProducts
}