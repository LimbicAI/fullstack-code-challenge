import request from 'supertest';
import app from '../../src/app';
import Answer from '../../src/models/answer';
import mongoose from 'mongoose';

const dummyAnswerData = {
  body: 'Test answer body',
  userId: new mongoose.Types.ObjectId(),
  questionId: new mongoose.Types.ObjectId()
};
describe('AnswerController', () => {
  it('should create a new answer', async () => {
    const response = await request(app)
      .post('/answers')
      .send(dummyAnswerData);

    expect(response.status).toBe(201);
    expect(response.body.body).toBe(dummyAnswerData.body);
  },10000);

  it('should edit an answer', async () => {
    const createdAnswer = await Answer.create(dummyAnswerData);

    const updatedBody = 'Updated answer body';

    const response = await request(app)
      .put(`/answers/${createdAnswer._id}`)
      .send({ body: updatedBody });

    expect(response.status).toBe(200);
    expect(response.body.body).toBe(updatedBody);
  }, 10000);

  it('should delete an answer', async () => {
    const createdAnswer = await Answer.create(dummyAnswerData);

    const response = await request(app)
      .delete(`/answers/${createdAnswer._id}`);

    expect(response.status).toBe(204);
    const deletedAnswer = await Answer.findById(createdAnswer._id);
    expect(deletedAnswer).toBeNull();
  });



  it('should get user answers', async () => {
    await Answer.create(dummyAnswerData);
    await Answer.create({
      body: 'Another test answer body',
      userId: new mongoose.Types.ObjectId(),
      questionId: new mongoose.Types.ObjectId()
    });

    const response = await request(app)
      .get(`/answers/user/${dummyAnswerData.userId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 10000);
});
