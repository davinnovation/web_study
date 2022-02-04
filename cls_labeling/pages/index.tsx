import { getProjectState, getLabelItemState } from "context/ItemContext"
import { Button, Container } from '@mui/material';

function HomePageLayout() {
    let a = getProjectState();
    let b = getLabelItemState();

    return (
        <Container maxWidth={false}>
            <Button variant="contained">Hello World</Button>
            current project_id : {a.project_id} | item state : {b.item_id} {b.label.length}
        </Container>
    )
}

export default HomePageLayout