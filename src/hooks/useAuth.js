import axiosClient from "@/axiosConfig/axiosClient";
import useSWR from 'swr'

export function useAuth(){
    const {data: userData, isLoading, isValidating, error, mutate} = useSWR(`/users/me`,{
        refreshInterval: 60000,
        dedupingInterval: 60000,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false
    })

    async function login(body){
        const request = await axiosClient.post('/login',body)
        await axiosClient.post('/update-device-id-for-user',{
            user: request?.id
        })
        await axiosClient.get('/create-cart-by-user')
        await mutate(request)
    }

    async function register(body){
        const request = await axiosClient.post('/register',body)
        await axiosClient.post('/update-device-id-for-user',{
            user: request?.id
        })
        await mutate(request)
    }

    async function changeInfo(body){
        const request = await axiosClient.put('/user/me',body)
        await mutate(request)
    }

    async function logout(){
        await axiosClient.post('logout')
        await mutate(undefined)
    }

    return{
        userData,
        isLoading,
        login,
        register,
        changeInfo,
        logout
    }
}