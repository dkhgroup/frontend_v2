import axiosClient from "@/axiosConfig/axiosClient";
import useSWR from 'swr'

export function useAddressBook(){
    const {data: addressBooks, isLoading, isValidating, error, mutate} = useSWR(`/address-books?limit=100&offset=0`,{
        refreshInterval: 1000*60*60*24,
        dedupingInterval: 1000*60*60*24,
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false
    })

    async function create(datas){
        await axiosClient.post('/address-books', datas)
        await mutate()
    }

    async function update(datas,id){
        await axiosClient.put(`/address-books/${id}`, datas)
        await mutate()
    }

    async function deleteAddress(id){
        await axiosClient.delete(`/address-books/${id}`)
        await mutate()
    }

    async function setDefaultAddress(id){
        await axiosClient.post('address-books/set-default-address',{id})
        await mutate()
    }

    return{
        addressBooks,
        isLoading,
        create,
        deleteAddress,
        setDefaultAddress,
        update
    }
}