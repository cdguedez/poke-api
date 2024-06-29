import * as joi from 'joi';

export const JoiSchemaValidation = joi.object({
  MONGO_URL: joi
    .string()
    .default(
      'mongodb://mongo:POSuQcsuMKspgKmWExLFWgsEzpuHvHPG@roundhouse.proxy.rlwy.net:50526',
    ),
  PORT: joi.number().default(3000),
  POKEAPI_URL: joi.string().default('https://pokeapi.co/api/v2/pokemon'),
});
