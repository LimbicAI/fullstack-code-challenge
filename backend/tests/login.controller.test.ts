import request from 'supertest';
import expressApp from '../src/main';

describe('Login Controller', () => {
  describe('POST /api/login', () => {
    it('should return a token with http status code 200', async () => {
      // Send a GET request to retrieve the list of users
      const res = await request(expressApp).post('/api/login').send({ username: 'admin', password: 'admin' });
      
      // Wait for 1 second // to prevent console.log warnings when console.logging after test is finished
      await new Promise((resolve) => { setTimeout(()=> resolve(true), 1000); });

      // Expect a successful response with status code 200
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token.length).toEqual(36);
    });
  });
});
