import { NextApiRequest, NextApiResponse } from "next";
import { ImageMeta, ImageMetaDB } from "types/item";

async function api<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json() as Promise<T>
    })
}

async function get_database(req: NextApiRequest, res: NextApiResponse) {
    const API_URL:string = process.env.GET_DB_API as string;

    switch (req.method) {
        case "GET":
            if (!('project_id' in req.query)) {
                res.status(400).send("{project_id} param is missing");
            }
            break;
        default:
            res.status(400).send("Wrong Request Type");
    }

    let project_id = req.query['project_id'] as string;
    let params = new URLSearchParams({'project_id' : project_id});
    let url = API_URL + "?" + params.toString();

    console.log(url);
    let img_db = await api<ImageMeta[]>(url);
    let db: ImageMetaDB = {
        db_get_date: Date.now(),
        project_id: project_id,
        img_list: Array<ImageMeta>()
    }
    db.img_list = img_db;

    res.status(200).json(db)
}

export default get_database;