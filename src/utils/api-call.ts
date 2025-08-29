import axios, { AxiosRequestConfig, AxiosError } from "axios"
import { useStore } from "zustand"
import { responseStore } from "../components/contexts/response/response"

export const handleWebCall = async (config: AxiosRequestConfig) => {
    const { setResponseState } = useStore(responseStore)
    try {
        const response = await axios.request(config)
        setResponseState(response)
    } catch (error: any) {
        const e = error as unknown as AxiosError
        if (e.response) {
            setResponseState(e.response)
        } else {
            alert(e)
        }
    }
}