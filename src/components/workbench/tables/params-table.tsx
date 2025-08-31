import { useMemo, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, IconButton, Button, Box
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { RequestProps } from "../workbench-interface";
import { Header, Param } from "../../../structures/components";

export default function KeyValueInputTable(props: {
    rows: Param[] | Header[], setRows: (value: Param[] | Header[]) => void, onChange?: (props: RequestProps) => void, type: 'params' | 'headers'
}) {
    const { rows, setRows } = props
    useEffect(() => {
        if (!rows || rows.length === 0) {
            setRows([{ key: "", value: "" }]);
        }
    }, [rows, setRows]);

    const handleChange = (index: number, field: "key" | "value", newValue: string) => {
        const updated = [...rows];
        updated[index][field] = newValue;
        setRows(updated);
    };

    const addRow = () => {
        setRows([...rows, { key: "", value: "" }]);
    };

    const removeRow = (index: number) => {
        const updated = rows.filter((_, i) => i !== index);
        setRows(updated.length ? updated : [{ key: "", value: "" }]);
    };

    // Build final object from rows
    const keyValueObject = useMemo(() => {
        console.log(rows)
        const obj: Record<string, string> = {};
        rows.forEach(({ key, value }) => {
            if (key.trim() !== "") {
                obj[key] = value;
            }
        });
        return obj;
    }, [rows]);

    // Notify parent when paramsObject changes
    useEffect(() => {
        if (props.onChange) {
            props.onChange({ [props.type]: keyValueObject });
        }
    }, [keyValueObject, props.type]);

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Enter key"
                                        value={row.key}
                                        onChange={(e) => handleChange(index, "key", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Enter value"
                                        value={row.value}
                                        onChange={(e) => handleChange(index, "value", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => removeRow(index)} size="small">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                    startIcon={<Add />}
                    variant="contained"
                    size="small"
                    onClick={addRow}
                >
                    {props.type === 'params' ? 'Add Param' : 'Add Header'}
                </Button>
            </Box>
        </Box>
    );
}
