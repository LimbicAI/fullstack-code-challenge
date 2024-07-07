import request from 'supertest';
import expressApp from '../src/main';

describe('Answer Controller', () => {
  let userId: number;
  let questionId: number;
  let answerId: number;

  describe('GET /api/answer', () => {
    it('should return a list of answers for a given user ID', async () => {
      // Send a GET request to retrieve the list of users (selecting one user ID to use for the test)
      const userRes = await request(expressApp).get('/api/user');
      if(userRes.status == 200){
        userId = userRes.body.data[0].id;
        if(!userId || isNaN(Number(userId))){
          throw new Error("No user found!, skipping...");
        }
      }

      // Send a GET request to retrieve the list of answers for a user ID
      const res = await request(expressApp).get('/api/answer?' + new URLSearchParams({ userId: userId+"" }).toString());
      
      // Expect a successful response with status code 200
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('POST /api/answer', () => {
    it('should create a new answer', async () => {
      // Send a POST request to insert a new question
      const questionRes = await request(expressApp).post('/api/question').send({
        title: 'Test Question',
        content: 'This is a test question',
      });

      if(questionRes.status == 201){
        questionId = questionRes.body.data.id
        if(!questionId || isNaN(Number(questionId))){
          throw new Error("Test question wasn't inserted!, skipping...");
        }
      }

      // Send a POST request to create a new answer
      const res = await request(expressApp).post('/api/answer').send({ 
        userId, 
        questionId, 
        content: 'Example test answer' 
      });

      // Expect a successful response with status code 201
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);

      const { id } = res.body.data;
      expect(typeof id).toBe('number');

      answerId = id; // Store the ID for use in DELETE request
    });
  });

  describe('DELETE /api/answer', () => {
    it('should delete an answer with the given ID', async () => {
      // Send a DELETE request to delete an answer with the given ID
      const res = await request(expressApp).delete('/api/answer?' + new URLSearchParams({ id: answerId+"" }).toString());
      
      // Expect a successful response with status code 200
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
