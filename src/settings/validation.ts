import * as Joi from 'joi';

export const validationSchema = Joi.object({
  VERSION: Joi.string().required(),
});
