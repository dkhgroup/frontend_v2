// pages/api/meta-purchase.js
import axios from 'axios';
import crypto from 'crypto';
import { capiConfig } from '@/components/capi/config';
import Cookies from 'cookies';

const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export default async function handler(req, res) {

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    const fbp = cookies.get('_fbp')

    if (req.method === 'POST') {
        const { event_name, event_time, user_data, custom_data, event_id } = req.body;

        // Băm thông tin khách hàng
        const hashed_user_data = {
            em: hashData(user_data.email),
            ph: hashData(user_data.phone_number),
            ct: hashData(user_data.city),
            country: hashData("VN"),
            client_ip_address: "42.114.178.225",
            fbp
        };

        // Cấu trúc dữ liệu sự kiện
        const event = {
            event_name: event_name,
            event_time: event_time,
            event_id: event_id,
            user_data: hashed_user_data,
            custom_data: custom_data
        };

        console.log("capi",event)

        // Gửi yêu cầu lên Meta
        try {
            const response = await axios.post(
                `https://graph.facebook.com/${capiConfig.api_version}/${capiConfig.pixel_id}/events`,
                {
                    data: [event],
                    access_token: capiConfig.access_token
                }
            );
            res.status(200).json({ success: true, response: response.data });
        } catch (error) {
            console.error('Error sending event to Meta:', error?.response?.data);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
