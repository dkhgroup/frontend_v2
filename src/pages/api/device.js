import parser from 'ua-parser-js'
import requestIp from 'request-ip'
import axios from 'axios'
import Cookies from 'cookies'

export default async function handler(req, res) {

    const ua = parser(req.headers['user-agent'])
    const ip = requestIp.getClientIp(req)

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    const token = cookies.get('token')
    const device_id = cookies.get('deviceId')

    if(device_id) return res.status(200).json("success");
    
    let headers = { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
    }

    if(token) headers = {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }

    const data = {
        device_ua: ua,
        device_ip: ip,
        name: "website",
        platform: "website",
        device_token: ""
    }

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/devices`,
        headers: headers,
        data : data
    };

    try {
        const request = await axios.request(config)

        cookies.set('deviceId', request?.data, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            maxAge: 86400000 * 7,
        })

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error?.response)
    }

    res.status(200).json("success");
}