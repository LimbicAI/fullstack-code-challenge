import joi from 'joi';

export default joi.object({
  username: joi.string().trim().min(3).required(),
  password: joi.string().trim().min(3).required(),
});
