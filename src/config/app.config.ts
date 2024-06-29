export const appConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  database: process.env.MONGO_URL,
  pokeapi: {
    url: process.env.POKEAPI_URL,
  },
});
