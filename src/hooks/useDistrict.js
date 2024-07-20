import axiosClient from "@/axiosConfig/axiosClient";
import useSWR from 'swr'

export function useDistrict(regionId){
    const {data: districts, isLoading: districtLoading, isValidating, error, mutate} = useSWR(
        `/open/districts?filters[region]=${regionId}&pagination[page]=1&pagination[pageSize]=100`,
        {
            refreshInterval: 1000*60*60*24,
            dedupingInterval: 1000*60*60*24,
            refreshWhenHidden: false,
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    async function setDistricts(data){
        await mutate(data,false)
    }

    return{
        districts,
        districtLoading,
        setDistricts
    }
}