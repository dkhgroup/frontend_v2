import { event } from "nextjs-google-analytics";
import { getTotalCart } from "@/components/cart/func";

export function selectItemEvent(data){

    let items = []

    data?.attributes?.map(item => items.push({
        item_id: item?.sku,
        item_name: data?.name,
        discount: 0,
        index: +data?.sort_number,
        item_brand: "Maldini",
        item_category: data?.product_categories?.data[0]?.attributes?.name,
        item_list_id: null,
        item_list_name: "",
        item_variant: item?.property?.data?.attributes?.name,
        price: +data?.price,
        quantity: 1
    }))

    event("select_item", {
        item_list_id: "null",
        item_list_name: "null",
        items: items
    })
    
    return
}

export function viewItemEvent(data){
    let items = []

    data?.attributes?.map(item => items.push({
        item_id: item?.sku,
        item_name: data?.name,
        discount: 0,
        index: +data?.sort_number,
        item_brand: "Maldini",
        item_category: data?.product_categories[0]?.name,
        item_list_id: null,
        item_list_name: "",
        item_variant: item?.property?.name,
        price: +data?.price,
        quantity: 1
    }))

    event("view_item", {
        currency: "VND",
        value: +data?.price,
        items: items
    })
    
    return
}

export function addToCartEvent(data){
    event("add_to_cart", data)
}

export function beginCheckoutEvent(data){

    const total = getTotalCart(data)

    let items = []

    data?.cart_items?.map(item =>
        items.push({
            item_id: item?.san_pham?.attributes?.find(e => e?.property?.id == item?.property?.id)?.sku,
            item_name: item?.san_pham?.name,
            coupon: null,
            discount: 0,
            index: item?.id,
            item_brand: "Maldini",
            item_category: item?.san_pham?.product_categories[0]?.name,
            item_list_id: null,
            item_list_name: null,
            item_variant: item?.property?.name,
            price: +item?.san_pham?.price,
            quantity: +item?.qty
        })
    )

    const params = {
        currency: "VND",
        value: total,
        coupon: null,
        items: items
    }

    event("begin_checkout", params)


}

export function removeFromCartEvent(item){
    const params = {
        currency: "VND",
        value: +item?.qty * +item?.san_pham?.price,
        items: [{
            item_id: item?.san_pham?.attributes?.find(e => e?.property?.id == item?.property?.id)?.sku,
            item_name: item?.san_pham?.name,
            discount: 0,
            index: +item?.san_pham?.id,
            item_brand: 'Maldini',
            item_category: item?.san_pham?.product_categories[0]?.name,
            item_variant: item?.property?.name,
            price: +item?.san_pham?.price,
            quantity: +item?.qty
        }]
    }

    event("remove_from_cart", params)
}

export function purchaseEvent(data,transaction_id){


    const total = getTotalCart(data)

    let items = []

    data?.cart_items?.map(item =>
        items.push({
            item_id: item?.san_pham?.attributes?.find(e => e?.property?.id == item?.property?.id)?.sku,
            item_name: item?.san_pham?.name,
            coupon: null,
            discount: 0,
            index: item?.id,
            item_brand: "Maldini",
            item_category: item?.san_pham?.product_categories[0]?.name,
            item_list_id: null,
            item_list_name: null,
            item_variant: item?.property?.name,
            price: +item?.san_pham?.price,
            quantity: +item?.qty
        })
    )

    const params = {
        currency: "VND",
        value: total,
        transaction_id: transaction_id,
        coupon: 0,
        shipping: 0,
        tax: 0,
        items: items
    }
    
    event("purchase", params)
}