import axios from "axios";

export default async function handler(req, res) {

    const url = process.env.API_URL + '/products?pagination[page]=1&pagination[pageSize]=100&populate[0]=attributes&populate[1]=attributes.property&&populate[2]=thumbnail&populate[3]=product_categories'

    const getAllProduct = await axios.get(url)
    const allProduct = getAllProduct.data.data

    let result = `<?xml version="1.0"?>
        <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
        <channel>
        <title>DKH Group Viet Nam Store</title>
        <link>https://dkhgroup.com.vn</link>
        <description>Đây là ví dụ về tài liệu RSS 2.0 cơ bản chứa một mục</description>`

    for(let i=0;i<allProduct?.length;i++){

        const selectProduct = allProduct[i]?.attributes

        const sku = selectProduct?.sku

        selectProduct?.attributes?.map(item => result += `<item>
            <g:id>${item?.sku}</g:id>
            <g:item_group_id>${sku}</g:item_group_id>
            <g:title>${selectProduct?.name}</g:title>
            <g:description>${selectProduct?.name}, color ${item.property.data.attributes.name}</g:description>
            <g:link>https://dkhgroup.com.vn/san-pham/${selectProduct?.slug}</g:link>
            <g:image_link>${selectProduct?.thumbnail?.data?.attributes?.url}</g:image_link>
            <g:brand>Maldini</g:brand>
            <g:condition>new</g:condition>
            <g:availability>in stock</g:availability>
            <g:price>${+selectProduct?.price} VND</g:price>
            <g:google_product_category>${selectProduct?.product_categories?.data[0]?.attributes?.name}</g:google_product_category>
            <g:color>${item.property.data.attributes.name}</g:color>
            </item>
        `)
    }

    result += `</channel>
    </rss>`
  
    return res.status(200).send(result, { headers: { "Content-Type": "text/xml" } });
}