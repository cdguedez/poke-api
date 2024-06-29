import * as joi from 'joi';

export const JoiSchemaValidation = joi.object({
  MONGODB_URI: joi.string().required(),
  PORT: joi.number().default(3000),
  POKEAPI_URI: joi.string().required(),
});
