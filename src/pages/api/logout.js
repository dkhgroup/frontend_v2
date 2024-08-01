import Cookies from 'cookies'

export default async function handler(req, res) {

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
        cookies.set('token')
        return res.status(200).json('Thành công')
    } catch (error) {
        return res.status(403).json("Có lỗi, vui lòng thử lại")
    }

}
  