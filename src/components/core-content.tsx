import { useState } from "react";
import OpenModal from "./top-bar-modal/modal";
import { Box, Button, Tab, Table, Tabs, TextField } from "@mui/material";
import { CallButton } from "./call-button";
import { UrlBar } from "./url-bar";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";
import { RequestTabBox, ResponseTabBox } from "./tabs";
import { create } from "zustand";

export interface RequestProps { body?: string, headers?: AxiosRequestHeaders, params?: Record<string, string>, method?: string, url?: string }

export function CoreContent() {
    const [modalState, setModalState] = useState({ open: false, button: "" });


    const [requestMethod, setRequestMethod] = useState('GET');
    const [requestUrl, setRequestUrl] = useState('');
    const [requestBody, setRequestBody] = useState('');
    const [requestParams, setRequestParams] = useState<Record<string, string>>({});
    const [requestHeaders, setRequestHeaders] = useState<AxiosRequestHeaders>({} as AxiosRequestHeaders);
    const [requestState, setRequestState] = useState({ method: requestMethod, url: requestUrl, body: requestBody, headers: requestHeaders, params: requestParams });
    const [requestTabValue, setRequestTabValue] = useState(0);

    // This is infinitely looping when something is updated and needs to be fixed
    function handleRequestChange(props: { body?: string, headers?: AxiosRequestHeaders, params?: Record<string, string>, method?: string, url?: string }) {
        const { body, headers, params, method, url } = props
        if (body !== undefined) setRequestBody(body)
        if (headers !== undefined) setRequestHeaders(headers)
        if (params !== undefined) setRequestParams(params)
        if (method !== undefined) setRequestMethod(method)
        if (url !== undefined) setRequestUrl(url)
        // setRequestState({ method: method ?? requestMethod, url: url ?? requestUrl, body: body ?? requestBody, headers: headers ?? requestHeaders, params: params ?? requestParams })
    }

    const [responseState, setResponseState] = useState<AxiosResponse | undefined>();
    const [responseTabValue, setResponseTabValue] = useState(0);

    const openModal = (button: string) => setModalState({ open: true, button });
    const closeModal = () => setModalState({ open: false, button: "" });

    const handleCall = async () => {
        try {
            const response = await axios.request({
                method: requestMethod as any,
                url: requestUrl,
                data: requestBody,
                headers: requestHeaders,
                params: requestParams,
            })
            setResponseState(response)
            // alert(response.status)
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Box textAlign='center' padding={2}>
                <h1>Web Caller</h1>
                <p style={{ paddingBlockEnd: 10 }}>Make API calls.</p>
            </Box>
            <Box>
                <UrlBar onChange={setRequestUrl} />
                <CallButton onClick={handleCall} />
            </Box>
            <RequestTabBox state={requestState} onChange={handleRequestChange} requestTabValue={requestTabValue} setRequestTabValue={setRequestTabValue} />
            <ResponseTabBox responseState={responseState} responseTabValue={responseTabValue} setResponseTabValue={setResponseTabValue} />
            <OpenModal
                open={modalState.open}
                onClose={closeModal}
                button={modalState.button}
            />
        </div>
    );
}