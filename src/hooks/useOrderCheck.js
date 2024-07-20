import useSWR from 'swr'

export function useOrderCheck(code){
    const {data: thisOrder, isLoading, isValidating, error, mutate} = useSWR(`/open/dkh-order/${code}`,{
        refreshInterval: 1000 * 60 * 60 * 24,
        dedupingInterval: 1000 * 60 * 60 * 24,
        refreshWhenHidden: false,
        revalidateOnFocus: false
    })

    return{
        thisOrder, 
        isLoading
    }
}