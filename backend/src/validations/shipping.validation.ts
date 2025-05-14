import Joi from 'joi';

export const shippingZoneSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
});


export const citySchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    shippingZoneId: Joi.number().integer().required(),
  });
  