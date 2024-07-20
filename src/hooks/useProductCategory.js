import axiosClient from '@/axiosConfig/axiosClient'
import { convertPopulateParams } from '@/params/convert'
import { productParams } from '@/params/products'
import useSWR from 'swr'

export function useProductCategory(id){
    const {data: products, isLoading, isValidating, error, mutate} = useSWR(
            `/open/products?${convertPopulateParams(productParams)}&filters[product_categories][id][$eq]=${id}&pagination[page]=1&pagination[pageSize]=4`,
        {
            refreshInterval: 1000 * 60 * 60,
            dedupingInterval: 1000 * 60 * 60,
            refreshWhenHidden: false,
            revalidateOnFocus: false
        }
    )

    async function refreshProductList(id,pageSize,sort){
        const req = await axiosClient.get(
            `/open/products?${convertPopulateParams(productParams)}&filters[product_categories][id][$eq]=${id}&pagination[page]=1&pagination[pageSize]=${pageSize}&${sort}`
        )
        await mutate(req,false)
    }

    return{
        products,
        isLoading,
        refreshProductList
    }
}