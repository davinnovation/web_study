import type { NextApiRequest, NextApiResponse } from 'next'
import type { ImageMeta } from 'types/item';

import faker from '@faker-js/faker';

const CREATE_LENGTH_IMG = 1000;

function get_db(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            if (!('project_id' in req.query)) {
                res.status(400).send("{project_id} param is missing");
            }
            break;
        default:
            res.status(400).send("Wrong Request Type");
    }

    let db: ImageMeta[] = new Array<ImageMeta>();

    const label_candidates = [{}, {"cls" : [1]}, {"cls" : [2]}, {"cls" : [3]}, {"cls" : [1, 2]}];

    [...Array(CREATE_LENGTH_IMG)].forEach((_, i) => {
        let img_meta: ImageMeta = {
            img_id : faker.datatype.number(),
            img_url : faker.image.animals(),
            img_meta : label_candidates[Math.floor(Math.random() * label_candidates.length)]
        }
        db.push(img_meta);
    });

    res.status(200).json(db)
};

export default get_db;