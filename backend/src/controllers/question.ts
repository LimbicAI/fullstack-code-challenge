import express, { Request, Response } from 'express';
import questionSchema from '../schemas/question';

import db from '../db';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await db(db.tables.question).select().orderBy([{ column: "id", order: 'asc' }]);

    return res.status(200).json({ success: true, msg: 'Data fetched successfully', data });
  } 
  catch (error) {
    console.error(error);
    
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const { error } = questionSchema.validate({ title, content });
  if(error) {
    console.error(error);

    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: error.details[0].message });
  }

  try {
    const { id } = (await db(db.tables.question).insert({ title, content }).returning("id"))[0];

    if(!id || isNaN(Number(id))){
      console.error({ id });

      return res.status(500).json({ success: false, msg: 'Internal server error' });
    }

    return res.status(201).json({ success: true, msg: 'Data saved successfully', data: { id } });
  }
  catch (error) {
    console.error(error);
    
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.patch("/", async (req: Request, res: Response) => {
  const { id, title, content } = req.body;

  if(!id || isNaN(Number(id))){
    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: "!id || isNaN(Number(id))" }); 
  }

  const { error } = questionSchema.validate({ title, content });
  if(error) {
    console.error(error);

    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: error.details[0].message });
  }

  try {
    const isUpdated = await db(db.tables.question).where({ id }).update({ title, content });
    
    if(!isUpdated || isNaN(Number(isUpdated))){
      console.error({ isUpdated });

      return res.status(500).json({ success: false, msg: 'Internal server error' });
    }

    return res.status(200).json({ success: true, msg: 'Data saved successfully' });
  }
  catch (error) {
    console.error(error);
    
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.query;

  if(!id || isNaN(Number(id))){
    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: "!id || isNaN(Number(id))" }); 
  }

  try {
    const isDeleted = await db(db.tables.question).where({ id }).delete();

    if(!isDeleted || isNaN(Number(isDeleted))){
      console.error({ isDeleted });

      return res.status(500).json({ success: false, msg: 'Internal server error' });
    }

    return res.status(200).json({ success: true, msg: 'Data deleted successfully' });
  }
  catch (error) {
    console.error(error);
    
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

module.exports = router;
