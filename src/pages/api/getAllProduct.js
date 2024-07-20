import axios from "axios";
import { globalConfig } from "@/theme/globalConfig";

export default async function handler(req, res) {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.API_URL}/products?pagination[page]=1&pagination[pageSize]=100`,
            headers: { }
        };
        const request = await axios(config)

        const allProduct = await request?.data?.data

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(generateXML(allProduct));

    } catch (error) {
        res.status(400).json({ name: "John Doe" });
    }
}
  
const generateXML = (allProduct) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
        <channel>
            <title>DKHGROUP</title>
            <link>${globalConfig.fontEndUrl}</link>
            <description>DKH Group được thành lập với một mục đích rất rõ ràng: chúng tôi muốn mang đến cho thị trường những sản phẩm về đồ da, thời trang và dược phẩm phù hợp nhu cầu với chất lượng tốt nhất và giá cả hợp lí nhất.</description>`;

    allProduct.forEach(product => {
        xml += `
        <item>
            <title>${product?.attributes?.name}</title>
            <link>${globalConfig.fontEndUrl}/san-pham/${product?.attributes?.slug}</link>
            <description>${product?.attributes?.description}</description>
            <g:id>${product?.id}</g:id>
            <g:price>${product?.attributes?.price} VND</g:price>
            <g:brand>Maldini</g:brand>
            <g:image_link>""</g:image_link>
            <g:availability>1000</g:availability>
        </item>`;
    });

    xml += `
        </channel>
    </rss>`;
    return xml;
}