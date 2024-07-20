import axiosClient from "@/axiosConfig/axiosClient";
import { searchProducts } from "@/validations/search";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { convertPopulateParams } from "@/params/convert";
import { productParams } from "@/params/products";
import { useSearchProduct } from "@/hooks/useSearchProduct";
import SearchProductInput from "./input";
import KeywordSearchProduct from "./keyword";
import ResultSearch from "./result";

export default function SearchModal({open,setOpen}){

    const {searchProduct, isLoading} = useSearchProduct()
    const [isResult,setIsResult] = useState(false)
    const [keyword,setKeyword] = useState("")
    const [loading,setLoading] = useState()
    const [products,setProducts] = useState(searchProduct?.data?.attributes?.san_phams?.data)

    const [disableInput,setDisableInput] = useState(false)

    const formik = useFormik({
        initialValues: {keyword: keyword},
        validationSchema: searchProducts,
        onSubmit: async (values) => {
            setLoading(true)
            setDisableInput(true)
            try {

                const request = await axiosClient.get(`/open/products?${convertPopulateParams(productParams)}&filters[name][$contains]=${values.keyword}`)
                setProducts(request?.data)

            } catch (error) {
                console.log("🚀 ~ onSubmit: ~ error:", error)
            }

            setLoading(false)
            setIsResult(true)
            setDisableInput(false)
        }
    })

    return(
        <>
        <Stack spacing={3}>
            <SearchProductInput
                datas={searchProduct?.data?.attributes}
                keyword={keyword}
                setKeyword={setKeyword}
                loading={loading}
                setLoading={setLoading}
                formik={formik}
                disableInput={disableInput}
            />
            <KeywordSearchProduct
                datas={searchProduct?.data?.attributes}
                keyword={keyword}
                setKeyword={setKeyword}
                loading={loading}
                setLoading={setLoading}
                formik={formik}
                setProducts={setProducts}
                setIsResult={setIsResult}
            />
            <ResultSearch 
                datas={searchProduct?.data?.attributes}
                keyword={keyword}
                setKeyword={setKeyword}
                loading={loading}
                setLoading={setLoading}
                products={products}
                isResult={isResult}
                open={open}
                setOpen={setOpen}
            />
        </Stack>
        </>
    )
}