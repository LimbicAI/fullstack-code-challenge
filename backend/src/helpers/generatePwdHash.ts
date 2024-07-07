// Run this independently (standalone)
// use: npx ts-node generatePwdHash.ts
// This will generate the password hash for the given password and print it to stdout.

import crypto from 'crypto';
import config from '../config';

const password = 'admin';
const salt = 'cce5cc7a-e5c2-429c-b56d-e9df514d4641';

const pwdHash = crypto.createHash('sha512').update(password + salt + config.auth.pepper).digest('hex');

console.log({ pwdHash });