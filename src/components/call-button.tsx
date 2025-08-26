import { Button } from "@mui/material";
import { useState } from "react";

export function CallButton(props: { onClick?: () => void }) {
    return (
        <Button
            size="small"
            variant='contained'
            style={{ height: 40 }}
            onClick={props.onClick}
        >Call</Button>
    )
}