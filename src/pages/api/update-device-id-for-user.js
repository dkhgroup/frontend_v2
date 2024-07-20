import { decryptData } from "@/components/crypto/decryptData";
import axios from "axios"
import Cookies from 'cookies'

export default async function handleApi(req, res) {
    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    let bodyData;

    bodyData = decryptData(req.body)

    const token = cookies.get('token')
    const device_id = cookies.get('deviceId')

    if(!token) return res.status(403).json('not allow')
    if(!device_id) return res.status(403).json('not allow')

    let headers = { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }

    let config = {
        method: req.method,
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/devices/update-user`,
        headers: headers,
        data : {
            ...bodyData,
            device_id: device_id
        }
    };

    try {
        const request = await axios(config)
        return res.status(200).json(request.data)
    } catch (error) {
        return res.status(403).json(error?.response?.data || [])
    }
}
