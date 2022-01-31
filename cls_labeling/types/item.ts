interface ImageMeta {
    img_id : number,
    img_url : string,
    img_meta : any
}

interface ImageMetaDB {
    db_get_date : number,
    project_id: string
    img_list : ImageMeta[]
}

export type {ImageMeta, ImageMetaDB};