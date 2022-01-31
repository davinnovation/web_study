import type { NextApiRequest, NextApiResponse } from 'next'

interface UpdateItemRequest extends NextApiRequest {
    body: {
      img_id: number;
      img_url: string;
      img_meta: any;
    };
  }

function get_db(req: UpdateItemRequest, res: NextApiResponse) {
    res.status(200)
};

export default get_db;