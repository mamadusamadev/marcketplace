// validations/productUpdate.validation.ts
import Joi from 'joi';

export const productUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  condition: Joi.string().valid('NEW', 'LIKE_NEW', 'GOOD', 'ACCEPTABLE'),
  location: Joi.string(),
  categoryId: Joi.number(),
});
