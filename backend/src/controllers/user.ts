import express, { Request, Response } from 'express';

import db from '../db';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await db(db.tables.user).select().orderBy([{ column: "id", order: 'asc' }]);

    return res.status(200).json({ success: true, msg: 'Data fetched successfully', data });
  } 
  catch (error) {
    console.error(error);
    
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

module.exports = router;