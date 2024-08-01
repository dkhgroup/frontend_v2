import requestIp from 'request-ip'
export default function handler(req, res) {
    const ip = requestIp.getClientIp(req)
    res.status(200).json(ip);
}