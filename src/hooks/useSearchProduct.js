import { convertPopulateParams } from '@/params/convert'
import { productSearchParams } from '@/params/products'
import useSWR from 'swr'

export function useSearchProduct(){
    const {data: searchProduct, isLoading, isValidating, error, mutate} = useSWR(`/open/search?${convertPopulateParams(productSearchParams)}`,{
        refreshInterval: 1000 * 60 * 60 * 24,
        dedupingInterval: 1000 * 60 * 60 * 24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false
    })

    return{
        searchProduct,
        isLoading,
        error
    }
}