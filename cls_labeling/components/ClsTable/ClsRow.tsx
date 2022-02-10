import { TableRow, TableCell, Divider } from '@mui/material';

interface ClsRowProps {
    key: string
    name: string
    label: number[],
    onRowClick: any,
    select: boolean
}


function ClsRow({ key, name, label, onRowClick, select }: ClsRowProps) {

    let labeled = { background: "#fafafa" }
    if (label.length > 0)
        labeled = { background: "#d9e048" }
    return (
        <TableRow
            hover
            onClick={(event) => onRowClick(event, key)}
            selected={select}
        >
            <TableCell align="center" style={{
                borderRightStyle: "solid",
                borderRightColor: "black",
            }}>{name}</TableCell>
            <Divider light orientation="vertical" />
            <TableCell align="center">{label.map(item => (item.toString() + ' '))}</TableCell>
        </TableRow >
    )
}

export default ClsRow;