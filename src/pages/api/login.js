import { decryptData } from "@/components/crypto/decryptData";
import axios from "axios"
import Cookies from 'cookies'

export default async function handleApi(req, res) {

    if (req.method !== 'POST'){
        return res.status(405).json({
            code: 405,
            message: 'Method not Allow',
            data:[]
        })
    }

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    try {
        const dataRequest = decryptData(req.body)
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.API_URL}/auth/local`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : dataRequest
        };

        const request = await axios.request(config)

        cookies.set('token', request.data.jwt, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            maxAge: 86400000 * 7,
        })

        return res.status(200).json(request.data.user)

    } catch (error) {
        return res.status(403).json("Đăng nhập không thành công, vui lòng thử lại")
    }
}
