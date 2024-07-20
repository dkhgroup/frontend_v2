import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";
import { Container, Divider, Stack } from "@mui/material";
import { globalConfig } from "@/theme/globalConfig";
import AddtoCartGroup from "@/components/pages/product-detail/info/addToCart";

import InfoProduct from "./infoProduct";
import PropertyProduct from "./properties";

export default function CartBarDesktop(props) {
  const { window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 500,
  });

  return (
    <Fade in={trigger} sx={{display: {xs: 'none', md: 'block'}}}>
      <Stack style={styles.wrap} bgcolor={'#fff'} py={2}>
        <Container maxWidth={globalConfig.maxWidth}>
          <Stack 
            direction={"row"} 
            justifyContent={"space-between"} 
            alignItems={"center"} 
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <InfoProduct 
              data={props.data} 
              selectAttribute={props?.selectAttribute}
            />
            <PropertyProduct 
              data={props.data} 
              selectAttribute={props?.selectAttribute}
              setSelectAttribute={props.setSelectAttribute}
            />
            <AddtoCartGroup
              data={props.data} 
              selectAttribute={props?.selectAttribute}
              setSelectAttribute={props.setSelectAttribute}
              formik={props.formik}
            />
          </Stack>
        </Container>
      </Stack>
    </Fade>
  );
}

const styles ={
  wrap: {
    position: 'fixed',
    top:0,
    left: 0,
    right: 0,
    width: '100%',
    height: 80,
    borderBottom: '1px solid #eee',
    zIndex: 9
  }
}