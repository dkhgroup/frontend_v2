import { cdnImage } from "@/components/ui/cdnImage";

export function getAttributeName(id,data){
    let result = "unknow"
    data?.map(item => {
        if(item.property?.data?.id === id) result = item?.property?.data?.attributes?.name
    })

    return result
}

export function formatDataGallery(data){
    let result = [];
    data.map(item => {
        result.push({
            url: item.url,
            width: item.width,
            height: item.height
        })
    })

    return result
}

export function getAttributes(data,selectAttribute){
    let result;
    
    data?.attributes?.map(item => {
        if(item.property?.id != selectAttribute) return;
        result = {
            thumbnail: cdnImage(item.thumbnail.url, '/assets/empty-product-thumbnail.png'),
            productName: data.name,
            property: item.property.name,
            qty: 1,
            price: +data.price
        }
    })

    return result
}

export function handleChangeAttribute(item,setSelectAttribute,setGallery,gallaryProduct) {

    setSelectAttribute(item?.property?.id)

    if (item?.thumbnail?.url) {
        const result = gallaryProduct
        result.unshift({
            url: item?.thumbnail?.url,
            width: item?.thumbnail?.width,
            height: item?.thumbnail?.height
        })

        setGallery(result)
    }
}