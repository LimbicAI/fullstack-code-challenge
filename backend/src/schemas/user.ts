import joi from 'joi';

export default joi.object({
  fullname: joi.string().trim().min(3).required(),
});
