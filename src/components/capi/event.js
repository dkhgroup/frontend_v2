import axiosClient from '@/axiosConfig/axiosClient';
import axios from 'axios';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { capiConfig } from './config';

export const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export const getFBCookie = () => {
    // Get the fbp value from the cookie
    const fbp = document.cookie.split('; ').find(row => row.startsWith('_fbp=')).split('=')[1];
    const fbc = document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1];

    if(!fbc) return {fbp}

    return {fbp,fbc}
}

function hashEmail(email){
    if(!email) return
    return {
        em: hashData(email)
    }
}

function formatCart(cart){
    if(!cart || cart?.cart_items?.length < 1) return

    let contents = []
    let value = 0
    let content_ids = []

    cart?.cart_items?.map(item => 
        {
            const selectItem = item?.san_pham?.attributes?.find(el => el?.property?.id == item?.property?.id)

            contents.push({
                id: selectItem?.sku, 
                quantity: +item?.qty, 
                item_price: +item?.san_pham?.price
            })

            content_ids.push(selectItem?.sku)

            value += +item?.san_pham?.price * +item?.qty
        }
    )

    return {
        value,
        content_ids,
        contents,
        num_items: cart?.cart_items?.length
    }
}

export async function purchaseFBEvent(email,phone,city,cart,order_code){

    const getIP = await axiosClient.get('/getIp')

    const event_name = "Purchase"
    const event_time = Math.floor(new Date().getTime() / 1000)
    const eventID = uuidv4();

    const user_data = {
        ... hashEmail(email),
        ph: hashData(phone),
        ct: hashData(city),
        country: hashData("VN"),
        client_ip_address: getIP,
        client_user_agent: navigator.userAgent,
        ...getFBCookie()
    };

    const custom_data = {
        currency: 'VND',
        ...formatCart(cart),
        order_id: order_code,
        status: 'purchased',
    };

    const event = {
        event_name: event_name,
        event_time: event_time,
        event_id: eventID,
        user_data: user_data,
        custom_data: custom_data
    };

    try {
        window.fbq('track', event_name, {
            value: custom_data.value,
            currency: 'VND',
            eventID: eventID,
            user_data: user_data,
            custom_data: custom_data
        });

        const response = await axios.post(
            `https://graph.facebook.com/${capiConfig.api_version}/${capiConfig.pixel_id}/events`,
            {
                data: [event],
                access_token: capiConfig.access_token
            }
        );

        console.log(response)
    } catch (error) {
        console.log("🚀 ~ handleClick ~ error:", error)
    }

}

export async function viewContentFBEvent(data){

    let value = 0
    let content_ids = []
    let contents = []

    data?.attributes?.map(item => {
        value += +item?.price
        content_ids.push(item?.sku)
        contents.push({
            id: item?.sku, 
            quantity: 1, 
            item_price: +item?.price
        })
    })

    const getIP = await axiosClient.get('/getIp')

    const user_data = {
        country: hashData("VN"),
        client_ip_address: getIP,
        client_user_agent: navigator.userAgent,
        ...getFBCookie()
    };

    const custom_data = {
        currency: 'VND',
        value: value,
        content_ids,
        contents,
        num_items: content_ids?.length,
        status: 'viewitem',
    };

    const event_name = "ViewContent"
    const event_time = Math.floor(new Date().getTime() / 1000)
    const eventID = uuidv4();

    const event = {
        event_name: event_name,
        event_time: event_time,
        event_id: eventID,
        user_data: user_data,
        custom_data: custom_data
    };

    try {
        window.fbq('track', event_name, {
            value,
            currency: 'VND',
            eventID: eventID,
            user_data: user_data,
            custom_data: custom_data
        });

        const response = await axios.post(
            `https://graph.facebook.com/${capiConfig.api_version}/${capiConfig.pixel_id}/events`,
            {
                data: [event],
                access_token: capiConfig.access_token
            }
        );

        console.log(response)
    } catch (error) {
        console.log("🚀 ~ handleClick ~ error:", error)
    }
}

export async function addToCartFBEvent(value,sku,num_items,price){

    const event_name = "AddToCart"
    const event_time = Math.floor(new Date().getTime() / 1000)
    const eventID = uuidv4();
    
    const getIP = await axiosClient.get('/getIp')

    const user_data = {
        country: hashData("VN"),
        client_ip_address: getIP,
        client_user_agent: navigator.userAgent,
        ...getFBCookie()
    };

    const custom_data = {
        currency: 'VND',
        value: value,
        contents: [
            {
                id: sku, 
                quantity: num_items, 
                item_price: price * num_items
            }
        ],
        content_ids: sku,
        num_items: num_items,
        status: 'addtocart',
    };

    const event = {
        event_name: event_name,
        event_time: event_time,
        event_id: eventID,
        user_data: user_data,
        custom_data: custom_data
    };

    try {
        window.fbq('track', event_name, {
            value,
            currency: 'VND',
            eventID: eventID,
            user_data: user_data,
            custom_data: custom_data
        });

        const response = await axios.post(
            `https://graph.facebook.com/${capiConfig.api_version}/${capiConfig.pixel_id}/events`,
            {
                data: [event],
                access_token: capiConfig.access_token
            }
        );

        console.log(response)
    } catch (error) {
        console.log("🚀 ~ handleClick ~ error:", error)
    }
}

export async function initiateCheckoutFBEvent(cart){
    const getIP = await axiosClient.get('/getIp')

    const event_name = "InitiateCheckout"
    const event_time = Math.floor(new Date().getTime() / 1000)
    const eventID = uuidv4();

    const user_data = {
        country: hashData("VN"),
        client_ip_address: getIP,
        client_user_agent: navigator.userAgent,
        ...getFBCookie()
    };

    const custom_data = {
        currency: 'VND',
        ...formatCart(cart),
        status: 'checkout',
    };

    const event = {
        event_name: event_name,
        event_time: event_time,
        event_id: eventID,
        user_data: user_data,
        custom_data: custom_data
    };

    try {
        window.fbq('track', event_name, {
            value: custom_data.value,
            currency: 'VND',
            eventID: eventID,
            user_data: user_data,
            custom_data: custom_data
        });

        const response = await axios.post(
            `https://graph.facebook.com/${capiConfig.api_version}/${capiConfig.pixel_id}/events`,
            {
                data: [event],
                access_token: capiConfig.access_token
            }
        );

        console.log(response)
    } catch (error) {
        console.log("🚀 ~ handleClick ~ error:", error)
    }
}