import { decryptData } from "@/components/crypto/decryptData"
import axios from "axios"
import Cookies from 'cookies'

export default async function handleApi(req, res) {

    if(req?.method !== "PUT") return res.status(405).json('Method not allow')

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    const token = cookies.get('token')
    const device_id = cookies.get('deviceId')

    if(!device_id) return res.status(403).json('not allow')

    let headers = { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'deviceid': device_id,
    }

    if(token){
        headers = { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'deviceid': device_id,
        }
    }

    try {
        const bodyData = decryptData(req.body)

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.API_URL}/cart/change-property/${req.query.id}`,
            headers: headers,
            data: bodyData
        };

        const request = await axios(config)
        return res.status(200).json(request.data)
    } catch (error) {
        return res.status(403).json(error?.response?.data || [])
    }

}
