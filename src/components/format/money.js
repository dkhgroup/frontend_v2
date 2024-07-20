export default function FormatCurrency({data}){
    if(!data) return '-'
    return parseInt(data).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
}