import { useState } from "react";
import { Box } from "@mui/material";
import { CallButton } from "./call-button";
import { UrlBar } from "./url-bar";
import { AxiosRequestHeaders } from "axios";
import { RequestTabBox, ResponseTabBox } from "./tabs";
import { useStore } from "zustand";
import { requestStore } from "../state/request/request";
import { responseStore } from "../state/response/response";

export interface RequestProps { body?: string, headers?: AxiosRequestHeaders, params?: Record<string, string>, method?: string, url?: string }

export function WorkbenchInterface() {
    const { requestState, setRequestState } = useStore(requestStore)
    const [requestTabValue, setRequestTabValue] = useState(0);

    function handleRequestChange(props: { data?: string, headers?: AxiosRequestHeaders, params?: Record<string, string>, method?: string, url?: string }) {
        setRequestState({ ...requestState, ...props })
    }

    const { responseState } = useStore(responseStore);
    const [responseTabValue, setResponseTabValue] = useState(0);

    return (
        <div>
            <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 20, paddingBlockStart: 10, paddingBlockEnd: 10 }}>Make HTTP calls.</p>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} textAlign='center' padding={2}>
                <UrlBar onChange={(url) => setRequestState({ url })} />
                <CallButton />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'center' }}>
                <RequestTabBox onChange={handleRequestChange} requestTabValue={requestTabValue} setRequestTabValue={setRequestTabValue} />
                <ResponseTabBox responseState={responseState} responseTabValue={responseTabValue} setResponseTabValue={setResponseTabValue} />
            </Box>
        </div>
    );
}