import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Divider } from "@mui/material";
import { useVirtual } from "react-virtual";
import React from "react";

interface TableOption {
    tableHeight: string,
    tableWidth: string,
    rows: any[]
}

function ClsImageTable({ tableHeight, tableWidth, rows }: TableOption) {
    const parentRef = React.useRef()

    const rowVirtualizer = useVirtual({
        size: rows.length,
        parentRef,
        estimateSize: React.useCallback(() => 35, []), // TODO: flexible
        overscan: 5, // TODO: flexible
    })
    return (
        <TableContainer
            sx={{ maxHeight: tableHeight }}
        >
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">image name</TableCell>
                        <Divider orientation="vertical" />
                        <TableCell align="center">label</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody ref={parentRef}>
                    {rowVirtualizer.virtualItems.map(virtualRow => (
                        rows[virtualRow.index]
                    ))}
                    {/* {rows.map(row => ( # non virtualized
                        row
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ClsImageTable;