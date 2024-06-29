import * as joi from 'joi';

export const JoiSchemaValidation = joi.object({
  MONGO_URL: joi.string().required(),
  PORT: joi.number().default(3000),
  POKEAPI_URL: joi.string().default('https://pokeapi.co/api/v2/pokemon'),
});
