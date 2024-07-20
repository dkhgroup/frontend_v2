import { decryptData } from "@/components/crypto/decryptData";
import axios from "axios"
import Cookies from 'cookies'

function randomNum(){
    return Math.floor(Math.random() * 1000)
}                

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

    const dataRequest = decryptData(req.body)
    
    const bodyData = {
        username: dataRequest.phone,
        email: `anonymous${new Date().getTime()}${randomNum()}@dkhgroup.com.vn`,
        phone: dataRequest.phone,
        password: dataRequest.password,
        user_email: dataRequest.email,
        fullname: dataRequest.fullname,
    }
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/auth/local/register`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : bodyData
    };
    
    try {
        
        const checkPhoneExist = await axios.post(`${process.env.API_URL}/auth/check-phone-exist`, {
            phone: dataRequest.phone
        })
        
        if(checkPhoneExist.data.exist) return res.status(403).json(checkPhoneExist.data.message)
        
        const request = await axios.request(config)
        
        cookies.set('token', request.data.jwt, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            maxAge: 86400000 * 7,
        })
        
        return res.status(200).json(request.data.user)
        
    } catch (error) {
        return res.status(403).json(error?.response?.data?.error?.message || "Đăng nhập không thành công, vui lòng thử lại")
    }
}
