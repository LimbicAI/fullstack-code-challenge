import express, { Request, Response } from 'express';
import answerSchema from '../schemas/answer';

import db from '../db';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { userId } = req.query;

  if(!userId || isNaN(Number(userId))){
    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: "!userId || isNaN(Number(userId))" }); 
  }

  try {
    const data = await db.select([
                            db.tables.answer + ".id",
                            db.tables.answer + ".userId",
                            db.tables.answer + ".content",
                            db.tables.answer + ".created_at",
                            db.tables.question + ".id as questionId",
                            db.tables.question + ".title as questionTitle",
                            db.tables.question + ".content as questionContent",
                          ])
                          .from(db.tables.question)
                          .leftJoin(db.tables.answer, function(this: any) {
                            this.on(db.tables.answer + ".questionId", "=", db.tables.question + ".id")
                                .andOn(db.tables.answer + ".userId", "=", db.raw('?', [userId]));
                          })
                          .orderBy([{ column: "questionId", order: 'asc' }]);

    return res.status(200).json({ success: true, msg: 'Data fetched successfully', data });
  }
  catch (error) {
    console.error(error);
    
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, questionId, content } = req.body;

  const { error } = answerSchema.validate({ userId, questionId, content });
  if(error) {
    console.error(error);

    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: error.details[0].message });
  }

  try {
    const { id } = (await db(db.tables.answer).insert({ userId, questionId, content }).returning("id"))[0];

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

router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.query;

  if(!id || isNaN(Number(id))){
    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: "!id || isNaN(Number(id))" }); 
  }

  try {
    const isDeleted = await db(db.tables.answer).where({ id }).delete();

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
