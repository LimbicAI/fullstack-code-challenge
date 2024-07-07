import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import loginSchema from '../schemas/login';
import config from '../config';
import global from '../global';

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { error } = loginSchema.validate({ username, password });
  if(error) {
    console.error(error);

    return res.status(400).json({ success: false, msg: 'Some given data are malformed or missing', info: error.details[0].message });
  }

  try {
    const user = config.auth.credentials[username as keyof typeof config.auth.credentials];

    if(!user){
      return res.status(401).json({ success: false, msg: 'Unauthorized', info: "User not found!" });
    }

    const pwdHash: string = crypto.createHash('sha512').update(password + user.salt + config.auth.pepper).digest('hex');

    if(user.pwdHash !== pwdHash){
      return res.status(401).json({ success: false, msg: 'Unauthorized', info: "Login failed!" });
    }

    const token = uuid();
    global.redis.set(token, Date.now());

    return res.status(200).json({ success: true, msg: 'Data fetched successfully', data: { token } });
  }
  catch(e){
    console.error(e);

    return res.status(401).json({ success: false, msg: 'Unauthorized', info: "Login failed!!" });
  }
});

module.exports = router;
