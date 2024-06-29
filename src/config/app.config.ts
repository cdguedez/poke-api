export const appConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: process.env.MONGODB_URI,
  pokeapi: {
    url: process.env.POKEAPI_URL,
  },
});
