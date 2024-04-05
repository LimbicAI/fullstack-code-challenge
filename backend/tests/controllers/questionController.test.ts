import request from 'supertest';
import app from '../../src/app';
import Question from '../../src/models/question';

const dummyQuestionData = {
  title: 'Test Question',
  body: 'This is a test question body.',
  userId: 'dummyUserId'
};

describe('QuestionController', () => {
  it('should create a new question', async () => {
    const response = await request(app)
      .post('/questions')
      .send(dummyQuestionData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(dummyQuestionData.title);
    expect(response.body.body).toBe(dummyQuestionData.body);
  });

  it('should edit a question', async () => {
    const createdQuestion = await Question.create(dummyQuestionData);

    const updatedTitle = 'Updated Title';
    const updatedBody = 'This is an updated question body.';

    const response = await request(app)
      .put(`/questions/${createdQuestion._id}`)
      .send({ title: updatedTitle, body: updatedBody });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTitle);
    expect(response.body.body).toBe(updatedBody);
  });

  it('should delete a question', async () => {
    const createdQuestion = await Question.create(dummyQuestionData);

    const response = await request(app)
      .delete(`/questions/${createdQuestion._id}`);

    expect(response.status).toBe(204);
    const deletedQuestion = await Question.findById(createdQuestion._id);
    expect(deletedQuestion).toBeNull();
  });

  it('should get all questions', async () => {
    await Question.create(dummyQuestionData);
    await Question.create({ title: 'Another Test Question', body: 'Another test question body.', userId: 'dummyUserId' });

    const response = await request(app)
      .get('/questions');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
