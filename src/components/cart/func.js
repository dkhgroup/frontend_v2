export function getTotalCart(cart){

    let result = 0;

    if(!cart) return result;

    {cart && cart?.cart_items?.map(item =>
        {
            result += +item?.san_pham?.price * +item.qty
        }
    )}

    return result
}

export function getDefaultAddress(datas){
    if(!datas) return
    let result;

    datas?.map(item => {
        if(!item?.default) return
        result = item
    })

    return result
}

export function formatCartItem(datas){

    let result = []
    datas.map(item => {
        result.push({
            property:item.property.id,
            san_pham:item.san_pham.id,
            price:+item.san_pham.price,
            qty:+item.qty,
            total:+item.san_pham.price * +item.qty
        })
    })
    return result
}

export function getCartItem(datas){
    let result = []
    datas.map(item => {result.push(item.id)})
    return result
}