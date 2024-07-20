import axiosClient from '@/axiosConfig/axiosClient'
import { convertPopulateParams } from '@/params/convert'
import { productParams } from '@/params/products'
import useSWR from 'swr'

export function useProductTab(category_id){

    const {data: listProduct, isLoading, isValidating, error, mutate} = useSWR(
        `/open/products?${convertPopulateParams(productParams)}&filters[product_categories][id][$eq]=${category_id}&pagination[page]=1&pagination[pageSize]=4`,
        // `/product/product-category/${category_id}`,
        {
            refreshInterval: 1000 * 60 * 60,
            dedupingInterval: 1000 * 60 * 60,
            refreshWhenHidden: false,
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    async function loadmoreAction(num){
        const url = `/open/products?${convertPopulateParams(productParams)}&filters[product_categories][id][$eq]=${category_id}&pagination[page]=1&pagination[pageSize]=${num}`
        const request = await axiosClient.get(url)
        await mutate(request, false)
    }

    return{
        listProduct,
        isLoading,
        loadmoreAction
    }
}