export const appConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGODB,
  port: process.env.PORT,
  pokeApiUrl: process.env.POKEA_PI_URL,
});
