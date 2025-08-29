import { Box, Tabs, Tab, TableContainer, Paper, Table, TableCell, TableRow, TableHead, TableBody } from "@mui/material";
import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";
import KeyValueInputTable from "./tables/params-table";
import { RequestProps } from "./core-content";
import { useState } from "react";
import { AuthSelect } from "./selects/auth-select";
import { useStore } from "zustand";
import { headersStore } from "./contexts/request/headers";
import { paramsStore } from "./contexts/request/params";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function RequestTabBox(props: { state: AxiosRequestConfig, onChange: (props: RequestProps) => void, requestTabValue: number, setRequestTabValue: (value: number) => void }) {
    const { state, onChange, requestTabValue, setRequestTabValue } = props;
    const { paramsState, setParamsState } = useStore(paramsStore);
    const { headersState, setHeadersState } = useStore(headersStore);

    return (
        <Box padding={5} textAlign='center'>
            <h2>Request</h2>
            <Tabs value={requestTabValue} aria-label="Request Controls" centered>
                <Tab label='Params' onClick={() => setRequestTabValue(0)} />
                <Tab label='Headers' onClick={() => setRequestTabValue(1)} />
                <Tab label='Auth' onClick={() => setRequestTabValue(2)} />
                <Tab label='Body' onClick={() => setRequestTabValue(3)} />
            </Tabs>
            <CustomTabPanel value={requestTabValue} index={0}>
                <KeyValueInputTable rows={paramsState} setRows={setParamsState} onChange={onChange} type='params'></KeyValueInputTable>
            </CustomTabPanel>
            <CustomTabPanel value={requestTabValue} index={1}>
                <KeyValueInputTable rows={headersState} setRows={setHeadersState} onChange={onChange} type='headers'></KeyValueInputTable>
            </CustomTabPanel>
            <CustomTabPanel value={requestTabValue} index={2}>
                <AuthSelect onChange={onChange}></AuthSelect>
            </CustomTabPanel>
            <CustomTabPanel value={requestTabValue} index={3}>
                Item Four
            </CustomTabPanel>
        </Box>
    )
}

function createData(key: string, value: string) {
    return { key, value };
}

export function ResponseTabBox(props: { responseState?: AxiosResponse, responseTabValue: number, setResponseTabValue: (value: number) => void }) {
    const headers = [];
    if (!props.responseState) {
        return <Box padding={5} textAlign='center'>
            <h2>Response</h2>
            <p>No response yet.</p>
        </Box>
    }
    const { responseState, responseTabValue, setResponseTabValue } = props;
    for (const entry of Object.entries(responseState.headers)) {
        headers.push(createData(entry[0], entry[1] as string));
    }
    return (
        <Box padding={5} textAlign='center'>
            <h2>Response</h2>
            <Tabs value={responseTabValue} aria-label="Response Info" centered>
                <Tab label='Headers' onClick={() => setResponseTabValue(0)} />
                <Tab label='Body' onClick={() => setResponseTabValue(1)} />
            </Tabs>
            <CustomTabPanel value={responseTabValue} index={0}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Headers Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {headers.map((row) => (
                                <TableRow
                                    key={row.key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.key}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={responseTabValue} index={1}>
                <Paper elevation={2}>
                    <Box
                        component="pre"
                        sx={{
                            textAlign: "left",
                            m: 0,
                            p: 2,
                            bgcolor: "background.default",
                            color: "text.primary",
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            maxHeight: 400,
                            overflowY: "auto",
                            overflowX: "auto",
                        }}
                    >
                        {JSON.stringify(props.responseState.data, null, 2)}
                    </Box>
                </Paper>
            </CustomTabPanel>
        </Box>
    )
}