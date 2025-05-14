import Joi from 'joi';


export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  phone: Joi.string().min(5).max(20),
  address: Joi.string().min(5).max(255),
  city: Joi.string().min(2).max(100),
  postalCode: Joi.string().min(4).max(20),
  country: Joi.string().min(2).max(100),
});

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().min(6).max(30),
  newPassword: Joi.string().required().min(6).max(30),
});

export const toggleSellerModeSchema = Joi.object({
  wantsToBeSeller: Joi.boolean().required(),
});
