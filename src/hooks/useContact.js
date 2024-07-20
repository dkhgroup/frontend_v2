import { getInitData } from '@/components/func/getInitData';
import useSWR from 'swr'

export function useContact(){
    const {data: contact, isLoading, isValidating, error, mutate} = useSWR(`/open/contact?populate[0]=Hotline&populate[1]=Email&populate[2]=social&populate[3]=social.icon&populate[4]=img_copyright&populate[5]=img_copyright.image`,{
        refreshInterval: 1000*60*60*24,
        dedupingInterval: 1000*60*60*24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        fallbackData: getInitData("contact"),
        onSuccess: (res) => {
            localStorage.setItem("contact", JSON.stringify(res));
        },
    })

    return{
        contact,
        isLoading
    }
}