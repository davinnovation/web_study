import * as React from 'react';
import { getProjectState, getProjectDispatch, getLabelItemState, getLabelItemDispatch } from "context/ItemContext"
import { Button, Container } from '@mui/material';
import LabelingLayout from "components/layout/labeling";
import ClsImageTable from "components/ClsTable/ClsImageTable";
import ClsRow from "components/ClsTable/ClsRow";
import ClsLabel from "components/Labeling/ClsLabel";
import useSWR from 'swr'
import axios from 'axios';

function ImageLabelPage() {
    let project_state = getProjectState(); // TODO context to ImageLabelPage Props
    let project_dispatch = getProjectDispatch();
    let item_state = getLabelItemState(); //TODO context to ImageLabelPage State
    let item_dispatch = getLabelItemDispatch();
    
    const fetcher = async (url) => {
        const response = await axios.get(url, {});
          return response.data;
      };

    // let [data, setList] = React.useState([]);
    let {data = [], error} = useSWR('http://localhost:8000', fetcher);
    let [img_url, setURL] = React.useState("/")
    let [img_name, setName] = React.useState("")
    let [inference, setInference] = React.useState("")

    // React.useEffect(() => {
    //     fetch('http://localhost:8000')
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setList(data)
    //       })
    // }, [])

    const label_func = (event, id:string, category:number) => {
        // item_dispatch({type:'ADD_LABEL', label:category})
        const newData = [...data];
        newData[id.item_id].label = category.toString();
        setList(newData);

        fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'key': id.item_id,
                    'label': category.toString()
                })
            }
        )
    }

    const infer = (id:string) => {
        fetch(`http://localhost:8000/predict/${id}`, {
                method: 'GET'
            }
        ).then((res) => res.json())
        .then((data) => {
            setInference(data)
        })
    }

    return (
        <LabelingLayout
            leftContent={
                ClsImageTable({
                    tableHeight:"100vh",
                    tableWidth:"100%",
                    rows: data.map((datum, i) => ClsRow({
                        key: datum.key,
                        name: datum.image_name,
                        label: datum.label.split(','),
                        onRowClick: (id: string) => {
                            item_dispatch({type:'SET_ID', item_id: datum.key})
                            infer(id=datum.key)
                            setURL(datum.image_url)
                            setName(datum.image_name + inference)
                        },
                        select: datum.key === item_state.item_id ? true : false
                    })),
                    row_length: data.length
                })
            }
            mainContent={
                <div style={{width:'100%', height:'100%', position:'relative'}}>
                    <ClsLabel src={img_url}/>
                </div>
            }
            mainContent_name={img_name}
            label1_func={label_func}
            label2_func={label_func}
        />
    )
}

export default ImageLabelPage