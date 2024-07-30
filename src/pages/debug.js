import { initPixel } from "@/components/capi/config";
import { purchaseFbPixel } from "@/components/capi/event";
import EmptyLayout from "@/layouts/empty"
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DebugPage() {

    const [loading, setLoading] = useState(false);

    const handlePurchase = async () => {
        setLoading(true);

        const eventName = 'Purchase 08 ngon luon';

        const event_id = "8748527458783895"

        const user_data = {
            em: 'nguyenhuytuan109@gmail.com',
            ph: '+84968168800',
            ct: 'Hà Nội',
            country: "VN",
            client_ip_address: "42.114.178.225"
        };

        const custom_data = {
            currency: 'VND',
            value: 4100000,
            content_ids: ['BLN-02-DOTUOI', 'BLN-02-DODO'],
            contents: [
                { id: 'BLN-02-DOTUOI', quantity: 1, item_price: 2050000 },
                { id: 'BLN-02-DODO', quantity: 1, item_price: 2050000 }
            ],
            num_items: 2,
            order_id: '309406',
            status: 'purchased',
        };

        // Giả định thông tin khách hàng và dữ liệu sự kiện
        const event = {
            event_name: eventName,
            event_time: Math.floor(new Date().getTime() / 1000), // Thời gian hiện tại tính theo giây
            event_id: event_id,
            user_data: {
                email: user_data.em,
                phone_number: user_data.ph,
                city: user_data.ct
            },
            custom_data: custom_data
        };

        try {
            // fb pixel
            purchaseFbPixel(eventName,user_data,custom_data,event_id)

            // capi
            const response = await axios.post('/api/fb', event);
            
        } catch (error) {
            console.error('Error sending purchase event:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        // Initialize Meta Pixel
        initPixel();
    },[])

    return (
        <>
            <LoadingButton loading={loading} onClick={handlePurchase}>Click</LoadingButton>
        </>
    )
}

DebugPage.Layout = EmptyLayout