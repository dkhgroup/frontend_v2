import useSWR from 'swr'

export function useDevice(){
    const {data: device, isLoading, isValidating, error, mutate} = useSWR(`/device`,{
        refreshInterval: 1000*60*60*24,
        dedupingInterval: 1000*60*60*24,
        refreshWhenHidden: false,
        revalidateOnFocus: false
    })

    return {
        device
    }
}