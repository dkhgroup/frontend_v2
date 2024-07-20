import axiosClient from '@/axiosConfig/axiosClient'
import useSWR from 'swr'

export function useOrder(){
    const {data: orders, isLoading, isValidating, error, mutate} = useSWR(`/orders`,{
        refreshInterval: 1000 * 60 * 60 * 24,
        dedupingInterval: 1000 * 60 * 60 * 24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false
    })

    async function create(data){
        const createOrder = await axiosClient.post('/orders/create', data)
        // await mutate()
        return createOrder
    }

    async function cancelOrder(id){
        await axiosClient.post(`/orders/cancel/${id}`)
        await mutate()
    }

    return{
        orders, 
        isLoading,
        mutate,
        create,
        cancelOrder
    }
}