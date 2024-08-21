import axiosClient from '@/axiosConfig/axiosClient'
import useSWR from 'swr'

export function useCart(){
    const {data: cart, isLoading, isValidating, error, mutate} = useSWR(`/cart/get`,{
        refreshInterval: 1000 * 60,
        dedupingInterval: 1000 * 60,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false
    })

    async function addToCart(data){
        await axiosClient.post('/cart/add', data)
        await mutate()
    }

    async function removeItemCart(id){
        await axiosClient.delete(`/cart/delete/${id}`)
        await mutate()
    }

    async function changeProperty(data,id){
        // sửa cái này
        const check = await axiosClient.put(`/cart/change-property/${id}`,data)
        await mutate(check, false)
    }

    async function changeQty(data,id){
        // sửa cái này
        const check = await axiosClient.put(`/cart/change-qty/${id}`,data)
        await mutate()
    }

    async function emptyCart(){
        await mutate(null,false)
    }

    return{
        cart,
        isLoading,
        isValidating,
        addToCart,
        removeItemCart,
        changeProperty,
        changeQty,
        mutate,
        emptyCart
    }
}