import * as joi from 'joi';

export const JoiSchemaValidation = joi.object({
  MONGODB: joi.string().required(),
  PORT: joi.number().default(3000),
  POKE_API_URL: joi.string().required(),
});
