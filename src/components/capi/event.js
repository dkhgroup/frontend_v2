import crypto from 'crypto';

const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export const getDataFB = (user_data) => {
    let result = {
        em: hashData(user_data.email),
        ph: hashData(user_data.phone),
        ct: hashData(user_data.city),
        country: hashData(user_data.country),
        client_ip_address: "42.114.178.225",
        client_user_agent: navigator.userAgent,
        fbp: fbp
    };
}

export const purchaseFbPixel = (event, custom_data, user_data, event_id) => {
    window.fbq('track', event, {
        eventID:event_id,
        ...custom_data,
        ...user_data
    });
};

export const purchaseCapiEvent = async (event, custom_data, user_data, event_id) => {
    // capi
    const response = await axios.post('/api/fb', event);
}
