import request from 'supertest';
import expressApp from '../src/main';

describe('User Controller', () => {
  describe('GET /api/user', () => {
    it('should return a list of users', async () => {
      // Send a GET request to retrieve the list of users
      const res = await request(expressApp).get('/api/user');
      
      // Expect a successful response with status code 200
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Expect the response body to contain an array of user data
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(0);
    });
  });
});
