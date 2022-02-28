import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Divider } from "@mui/material";
import { useVirtual } from "react-virtual";
import React from "react";

interface TableOption {
    tableHeight: string,
    tableWidth: string,
    rows: any[],
    row_length: number
}

function ClsImageTable({ tableHeight, tableWidth, rows, row_length }: TableOption) {
    const parentRef = React.useRef()

    const rowVirtualizer = useVirtual({
        size: row_length,
        parentRef,
        estimateSize: React.useCallback(() => 40, []), // TODO: flexible
        overscan: 10, // TODO: flexible
    })
    return (
        <TableContainer
            sx={{ maxHeight: tableHeight }}
        >
            <Table stickyHeader size="small" aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">image name</TableCell>
                        <Divider orientation="vertical" />
                        <TableCell align="center">label</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody ref={parentRef}>
                    {/* {rowVirtualizer.virtualItems.map(virtualRow => (
                        rows[virtualRow.index] # TODO <- not upadting
                    ))} */}
                    {rows.map(row => (
                        row
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ClsImageTable;