const Joi = require('joi');

// Create Profile Validation
const createProfileSchema = Joi.object({
  bio: Joi.string().allow('', null).messages({
    'string.base': 'Bio must be a string.',
  }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.required': 'Gender is required.',
      'any.only': 'Gender must be one of: male, female, or other.',
    }),
  interests: Joi.array().items(Joi.string().messages({
      'string.base': 'Each interest must be a string.',
    }))
    .required()
    .messages({
      'array.base': 'Interests must be an array.',
      'any.required': 'Interests are required.',
    }),
  birthday: Joi.date().required().messages({
    'date.base': 'Birthday must be a valid date.',
    'any.required': 'Birthday is required.',
  }),
  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number.',
    'number.min': 'Latitude must be at least -90.',
    'number.max': 'Latitude must be at most 90.',
    'any.required': 'Latitude is required.',
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number.',
    'number.min': 'Longitude must be at least -180.',
    'number.max': 'Longitude must be at most 180.',
    'any.required': 'Longitude is required.',
  }),
});

// Update Profile Validation
// const updateProfileSchema = Joi.object({
//   bio: Joi.string().allow('', null).messages({
//     'string.base': 'Bio must be a string.',
//   }),
//   gender: Joi.string()
//     .valid('male', 'female', 'other')
//     .messages({
//       'any.only': 'Gender must be one of: male, female, or other.',
//     }),
//   interests: Joi.array().items(Joi.string().messages({
//       'string.base': 'Each interest must be a string.',
//     }))
//     .messages({
//       'array.base': 'Interests must be an array.',
//     }),
//   birthday: Joi.date().messages({
//     'date.base': 'Birthday must be a valid date.',
//   }),
//   latitude: Joi.number().min(-90).max(90).messages({
//     'number.base': 'Latitude must be a number.',
//     'number.min': 'Latitude must be at least -90.',
//     'number.max': 'Latitude must be at most 90.',
//   }),
//   longitude: Joi.number().min(-180).max(180).messages({
//     'number.base': 'Longitude must be a number.',
//     'number.min': 'Longitude must be at least -180.',
//     'number.max': 'Longitude must be at most 180.',
//   }),
// });

const updateProfileSchema = Joi.object({
  bio: Joi.string().allow('', null),
  gender: Joi.string().valid('male', 'female', 'other'),
  interests: Joi.array().items(Joi.string()),
  birthday: Joi.date(),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  keptImages: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(), // ✅ Add this line
});





module.exports = {
  createProfileSchema,
  updateProfileSchema,
};
