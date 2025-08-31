import { Button } from "@mui/material";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useStore } from "zustand";
import { requestHistoryStore } from "../state/history/request-history";
import { responseStore } from "../state/response/response";
import { requestStore } from "../state/request/request";

export function CallButton() {
    const { requestState } = useStore(requestStore)
    const { setResponseState } = useStore(responseStore)
    const { requestHistoryState, setRequestHistoryState } = useStore(requestHistoryStore)
    const handleWebCall = async () => {
        try {
            const response = await axios.request(requestState)
            setResponseState(response)
            setRequestHistoryState([...requestHistoryState, { [new Date().toISOString()]: response }])
        } catch (error: any) {
            const e = error as unknown as AxiosError
            if (e.response) {
                setResponseState(e.response)
            } else {
                alert(e)
            }
        }
    }
    return (
        <Button
            size="small"
            variant='contained'
            style={{ height: 40 }}
            onClick={handleWebCall}
        >Call</Button>
    )
}