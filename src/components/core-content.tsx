import { useState } from "react";
import OpenModal from "./top-bar-modal/modal";
import { Box, Button, Tab, Table, Tabs, TextField } from "@mui/material";
import { CallButton } from "./call-button";
import { UrlBar } from "./url-bar";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";
import { RequestTabBox, ResponseTabBox } from "./tabs";
import { create, useStore } from "zustand";
import { requestStore } from "./contexts/request/request";
import { handleWebCall } from "../utils/api-call";
import { responseStore } from "./contexts/response/response";

export interface RequestProps { body?: string, headers?: AxiosRequestHeaders, params?: Record<string, string>, method?: string, url?: string }

export function CoreContent() {
    // const [requestMethod, setRequestMethod] = useState('GET');
    // const [requestUrl, setRequestUrl] = useState('');
    // const [requestBody, setRequestBody] = useState('');
    // const [requestParams, setRequestParams] = useState<Record<string, string>>({});
    // const [requestHeaders, setRequestHeaders] = useState<AxiosRequestHeaders>({} as AxiosRequestHeaders);
    const { requestState, setRequestState } = useStore(requestStore)
    const [requestTabValue, setRequestTabValue] = useState(0);

    // This is infinitely looping when something is updated and needs to be fixed
    function handleRequestChange(props: { data?: string, headers?: AxiosRequestHeaders, params?: Record<string, string>, method?: string, url?: string }) {
        setRequestState({ ...requestState, ...props })
    }

    const { responseState, setResponseState } = useStore(responseStore);
    const [responseTabValue, setResponseTabValue] = useState(0);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Box textAlign='center' padding={2}>
                <h1>Web Caller</h1>
                <p style={{ paddingBlockEnd: 10 }}>Make API calls.</p>
            </Box>
            <Box>
                <UrlBar onChange={(url) => setRequestState({ url })} />
                <CallButton onClick={() => handleWebCall(requestState)} />
            </Box>
            <RequestTabBox state={requestState} onChange={handleRequestChange} requestTabValue={requestTabValue} setRequestTabValue={setRequestTabValue} />
            <ResponseTabBox responseState={responseState} responseTabValue={responseTabValue} setResponseTabValue={setResponseTabValue} />
        </div>
    );
}