import Joi from 'joi';

export const productSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().required().messages({
    'number.base': '"price" must be a number válido'
  }),
  condition: Joi.string().valid('NEW', 'LIKE_NEW', 'GOOD', 'ACCEPTABLE').required(),
  location: Joi.string().required(),
  categoryId: Joi.number().required(),
});