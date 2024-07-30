import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export default function DebugPage(){

    const handleClick = async () => {
        const eventID = uuidv4();

        // Get the fbp value from the cookie
        const fbp = document.cookie.split('; ').find(row => row.startsWith('_fbp=')).split('=')[1];
        const fbc = document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1];

        let user_data = {
            em: hashData('nguyenhuytuan109@gmail.com'),
            ph: hashData('+84968168800'),
            ct: hashData('Hà Nội'),
            country: hashData("VN"),
            client_ip_address: "42.114.178.225",
            client_user_agent: navigator.userAgent,
            fbp: fbp,
            fbc: fbc,
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

        window.fbq('track', 'Purchase_pixel', {
            value: 4100000,
            currency: 'VND',
            eventID: eventID,
            user_data: user_data,
            custom_data: custom_data
        });
    }

    return (
        <button onClick={handleClick}>
            click
        </button>
    )
}