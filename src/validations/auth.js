import * as yup from 'yup'
const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/

const loginValidation = yup.object({
    identifier: yup
        .string()
        .matches(phoneRegExp,'Vui lòng nhập số điện thoại theo định dạng 10 số vd: 0968686868')
        .required('Bạn chưa nhập số điện thoại'),
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
        .required('Mật khẩu không được bỏ trống'),
})

const registerSchema = yup.object({
    fullname: yup
        .string()
        .required('Họ tên không được bỏ trống'),
    phone: yup
        .string()
        .matches(phoneRegExp,'Vui lòng nhập số điện thoại theo định dạng 10 số vd: 0968686868')
        .required('Bạn chưa nhập số điện thoại'),
    email: yup
        .string()
        .email(),
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
        .required('Mật khẩu không được bỏ trống'),
    repeatPassword: yup
        .string()
        .required('Nhập lại mật khẩu không được bỏ trống')
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
})

const updateUser = yup.object({
    fullname: yup
        .string()
        .required('Họ tên không được bỏ trống'),
    email: yup
        .string()
        .email(),
    sex: yup
        .string()
        .required('Vui lòng chọn giới tính'),
    birtDay: yup
        .string()
        .required('Vui lòng chọn ngày sinh'),
})

const changePassword = yup.object({
    currentPassword: yup
        .string()
        .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
        .required('Mật khẩu không được bỏ trống'),
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
        .required('Mật khẩu không được bỏ trống'),
    passwordConfirmation: yup
        .string()
        .required('Nhập lại mật khẩu không được bỏ trống')
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
})

const phoneValidation = yup.object({
    phone: yup
        .string()
        .matches(phoneRegExp,'Vui lòng nhập số điện thoại theo định dạng 10 số vd: 0968686868')
        .required('Bạn chưa nhập số điện thoại'),
})

const passwordChangeValidation = yup.object({
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
        .required('Mật khẩu không được bỏ trống'),
    repeatPassword: yup
        .string()
        .required('Nhập lại mật khẩu không được bỏ trống')
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
})

export {
    loginValidation,
    registerSchema,
    updateUser,
    changePassword,
    phoneValidation,
    passwordChangeValidation
}