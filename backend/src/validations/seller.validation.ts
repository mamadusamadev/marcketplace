import Joi from 'joi';

export const sellerApplicationSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    documentId: Joi.string().min(5).max(50).required(),
    iban: Joi.string().min(15).max(34).required(),
});

export const verifySellerSchema = Joi.object({
status: Joi.string().valid('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_ANALYSIS').required(),
verificationStatus: Joi.string().valid('VERIFIED', 'REJECTED', 'MISSING_DOCUMENTS').required(),
rejectionReason: Joi.string().allow('', null),
});  