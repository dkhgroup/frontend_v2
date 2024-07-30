import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { initPixel, purchase } from '../lib/pixel';
import { v4 as uuidv4 } from 'uuid';
import { capiConfig } from '@/components/capi/config';
import crypto from 'crypto';

const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

const purchase = (custom_data, user_data, eventID) => {
    window.fbq('track', 'Purchase', {
      eventID: eventID,
      ...custom_data,
      ...user_data
    });
};

export default function DebugPage(){

    const handleClick = () => {
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
            fbp: fbp
        };

        if(fbc){
            user_data = {
                ... user_data,
                fbc
            }
        }

        console.log(user_data)

        return

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

        // Send event to Meta Pixel with Event ID
        purchase(custom_data,user_data,eventID);

        // Send event to Meta CAPI with Event ID and fbp
        fetch(`https://graph.facebook.com/v13.0/${capiConfig.pixel_id}/events?access_token=${capiConfig.access_token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [{
                    event_name: 'Purchase',
                    event_time: Math.floor(new Date() / 1000),
                    event_id: eventID,
                    user_data: user_data,
                    custom_data: custom_data
                }]
            })
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));

    }

    return(
        <button onClick={handleClick}>click</button>
    )
}