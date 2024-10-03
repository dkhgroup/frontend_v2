import axios from "axios";

export default async function handler(req, res) {

    const url = process.env.API_URL + '/products?pagination[page]=1&pagination[pageSize]=100&populate=*'

    const getAllProduct = await axios.get(url)
    const allProduct = getAllProduct.data.data

    let result = `<?xml version="1.0"?>
        <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
        <channel>
        <title>DKH Group Viet Nam Store</title>
        <link>https://dkhgroup.com.vn</link>
        <description>Đây là ví dụ về tài liệu RSS 2.0 cơ bản chứa một mục</description>`
    allProduct.map(item => result+= `
        <item>

            <g:id>${item.attributes.sku}</g:id>
            <g:title>${item.attributes.name}</g:title>
            <g:description>${item.attributes.description}</g:description>
            <g:link>https://dkhgroup.com.vn/san-pham/${item.attributes.slug}</g:link> 
            <g:image_link>${item.attributes.thumbnail.data.attributes.url}</g:image_link> 
            <g:condition>new</g:condition>
            <g:availability>in stock</g:availability>
            <g:price>${item.attributes.price} VND</g:price>
            <g:shipping>

                <g:country>VN</g:country>
                <g:service>Standard</g:service>
                <g:price>0 VND</g:price>

            </g:shipping>
            <g:gtin></g:gtin>
            <g:brand>Maldini</g:brand>

        </item>
    `)

    result += `</channel>
    </rss>`
  
    return res.status(200).send(result, { headers: { "Content-Type": "text/xml" } });
}