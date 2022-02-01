import { getProjectState, getLabelItemState } from "context/ItemContext"


function HomePage () {
    let a = getProjectState();
    let b = getLabelItemState();

    return <div>current project_id : {a.project_id} | item state : {b.item_id} {b.label.length}</div>
}

export default HomePage