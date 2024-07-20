import { getInitData } from '@/components/func/getInitData';
import useSWR from 'swr'

export function useNavbar(){
    const {data: navbar, isLoading, isValidating, error, mutate} = useSWR(`/open/menus/5?nested&populate=*`,{
        refreshInterval: 1000 * 60 * 60 * 24,
        dedupingInterval: 1000 * 60 * 60 * 24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        fallbackData: getInitData("main_nav"),
        onSuccess: (res) => {
            localStorage.setItem("main_nav", JSON.stringify(res));
        },
    })

    return {
        navbar,
        isLoading
    }
}