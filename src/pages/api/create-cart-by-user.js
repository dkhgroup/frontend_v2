import { decryptData } from "@/components/crypto/decryptData";
import axios from "axios"
import Cookies from 'cookies'

export default async function handleApi(req, res) {
    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    const token = cookies.get('token')
    const deviceid = cookies.get('deviceId')

    if(!token || !deviceid) return res.status(403).json('not allow')

    let headers = { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'deviceid': deviceid
    }

    let config = {
        method: 'GET',
        url: `${process.env.API_URL}/cart/create-cart-by-user`,
        headers: headers,
    };

    try {
        const request = await axios(config)
        return res.status(200).json(request.data)
    } catch (error) {
        return res.status(403).json(error?.response?.data || [])
    }
}
