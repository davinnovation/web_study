import { TableRow, TableCell, Divider } from '@mui/material';

interface ClsRowProps {
    key: string
    name: string
    label: number[],
    onRowClick: any
}


function ClsRow({ key, name, label, onRowClick }: ClsRowProps) {

    let labeled = { background: "#fafafa" }
    if (label.length > 0)
        labeled = { background: "#d9e048" }
    return (
        <TableRow
            style={{ ...labeled }}
            hover
            onClick={(event) => onRowClick(event, key)}
        >
            <TableCell align="center" style={{
                borderRightStyle: "solid",
                borderRightColor: "black",
            }}>{name}</TableCell>
            <Divider orientation="vertical" />
            <TableCell align="center">{label.map(item => (item.toString() + ' '))}</TableCell>
        </TableRow >
    )
}

export default ClsRow;