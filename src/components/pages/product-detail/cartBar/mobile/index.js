import { Fade, Stack, useScrollTrigger } from "@mui/material";
import BtnAddToCart from "./btnAddToCart";
import BtnScrollToCart from "./btnScrollToDiv";

export default function CartBarMobile(props){

    const { window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 500,
    });

    return(
        <Fade in={trigger} sx={{display: {xs: 'block', md: 'none'}}}>
            <Stack style={styles.wrap} py={2} justifyContent={"center"} alignItems={"center"}>
                {props?.selectAttribute ? 
                    <BtnAddToCart {...props}/>
                    :
                    <BtnScrollToCart />
                }
            </Stack>
        </Fade>
    )
}

const styles ={
    wrap: {
      position: 'fixed',
      bottom:20,
      left: '10%',
      right: 0,
      width: '100%',
      height: 50,
      zIndex: 9,
    }
}