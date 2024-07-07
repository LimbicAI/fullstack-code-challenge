import joi from 'joi';

export default joi.object({
  userId: joi.number().integer().required(),
  questionId: joi.number().integer().required(),
  content: joi.string().trim().min(2).required(),
});
