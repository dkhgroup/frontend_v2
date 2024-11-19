import { Button } from "@mui/material";

export default function DebugPage(){

    const handleClick = () => {
        gtag('event', 'view_item', {
            'items': [{
              'id': '123456',   // ID sản phẩm
              'name': 'PRODUCT_NAME', // Tên sản phẩm
              'category': 'PRODUCT_CATEGORY', // Danh mục sản phẩm
              'price': 1000000 // Giá sản phẩm
            }]
        });
    }

    return(
        <>
            <Button onClick={handleClick}>Click event</Button>
        </>
    )
}