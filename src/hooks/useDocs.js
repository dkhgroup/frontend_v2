import { getInitData } from '@/components/func/getInitData';
import useSWR from 'swr'

export function useDocs(){
    const {data: listDocs, isLoading, isValidating, error, mutate} = useSWR(`/open/docs?pagination[page]=1&pagination[pageSize]=5`,{
        refreshInterval: 1000*60*60*24,
        dedupingInterval: 1000*60*60*24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        fallbackData: getInitData("docs"),
        onSuccess: (res) => {
            localStorage.setItem("docs", JSON.stringify(res));
        },
    })

    return{
        listDocs,
        isLoading
    }
}