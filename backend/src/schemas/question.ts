import joi from 'joi';

export default joi.object({
  title: joi.string().trim().min(2).required(),
  content: joi.string().trim().min(2).required(),
});
