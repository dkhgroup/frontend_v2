import { Fab } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ScrollToTopBtn(){

    const scrollToTop = () => {
        const anchor = document.getElementById("main-container");

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    }

    return(
        <Fab color="primary" aria-label="add" onClick={scrollToTop} sx={{zIndex: 9}}>
            <ArrowUpwardIcon />
        </Fab>
    )
}