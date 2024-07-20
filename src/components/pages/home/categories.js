import { Stack } from "@mui/material";
import { useState } from "react";
import AllProductHomepageTab from "./tab/all";
import ProductHomepageTab from "./tab/category";
import ListCategories from "./listCategory";

export default function ProductCategoriesSection({categories, allProducts}){

    const [tab,setTab] = useState(0)    

    return(
        <Stack spacing={2} mb={3}>

            <ListCategories
                categories={categories}
                tab={tab}
                setTab={setTab}
            />

            {tab === 0 && <AllProductHomepageTab datas={allProducts}/>}

            {tab !== 0 && <ProductHomepageTab tab={tab} />}
        </Stack>
    )
}