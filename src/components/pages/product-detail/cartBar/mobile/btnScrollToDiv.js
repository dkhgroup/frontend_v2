import { Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function BtnScrollToCart(){

    const scrollToTop = () => {
        const anchor = document.getElementById("product_info");

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    }

    return(
        <Button
            variant="contained"
            onClick={scrollToTop}
            color="secondary"
            startIcon={<ArrowUpwardIcon  />}
        >
            Chọn màu sắc sản phẩm
        </Button>
    )
}