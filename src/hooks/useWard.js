import axiosClient from "@/axiosConfig/axiosClient";
import useSWR from 'swr'

export function useWard(id){
    const {data: wards, isLoading: wardLoading, isValidating, error, mutate} = useSWR(
        `/open/wards?filters[district]=${id}&pagination[page]=1&pagination[pageSize]=100`,
        {
            refreshInterval: 1000*60*60*24,
            dedupingInterval: 1000*60*60*24,
            refreshWhenHidden: false,
            revalidateOnFocus: false
        }
    )

    async function setWards(data){
        await mutate(data,false)
    }

    return{
        wards,
        wardLoading,
        setWards
    }
}