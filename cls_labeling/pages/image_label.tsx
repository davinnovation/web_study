import { getProjectState, getLabelItemState } from "context/ItemContext"
import { Button, Container } from '@mui/material';
import LabelingLayout from "components/layout/labeling";
import ClsImageTable from "components/ClsTable/ClsImageTable";
import ClsRow from "components/ClsTable/ClsRow";

function imageLabelPage() {
    let a = getProjectState();
    let b = getLabelItemState();

    return (
        <LabelingLayout
            leftContent={
                ClsImageTable({
                    tableHeight:"100vh",
                    tableWidth:"100%",
                    rows: Array(50).fill(0).map((_, i) => ClsRow({
                        key: i.toString(),
                        name: i.toString(),
                        label: [0, 1],
                        onRowClick: (id: string) => { console.log(id) }
                    }))
                })
            }
            mainContent="name"
            mainContent_name="123"
        />
    )
}

export default imageLabelPage