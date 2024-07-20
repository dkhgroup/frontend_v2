import { getInitData } from '@/components/func/getInitData';
import useSWR from 'swr'

export function useStaticPage(){
    const {data: listPage, isLoading, isValidating, error, mutate} = useSWR(`/open/static-pages`,{
        refreshInterval: 1000*60*60*24,
        dedupingInterval: 1000*60*60*24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        fallbackData: getInitData("staticpage"),
        onSuccess: (res) => {
            localStorage.setItem("staticpage", JSON.stringify(res));
        },
    })

    return{
        listPage,
        isLoading
    }
}