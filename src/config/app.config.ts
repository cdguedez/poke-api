export const appConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  database: process.env.MONGODB_URI,
  pokeapi: {
    url: process.env.POKEAPI_URI,
  },
});
