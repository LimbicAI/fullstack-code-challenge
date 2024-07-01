import crypto from 'crypto';
import fs from 'node:fs';
import path from 'node:path';

const secret = crypto.randomBytes(32).toString('hex');

const refreshSecret = crypto.randomBytes(32).toString('hex');

fs.appendFileSync(
  path.resolve(__dirname, '../../', '.env'),
  `SECRET=${secret}\nREFRESH_SECRET=${refreshSecret}`,
);
