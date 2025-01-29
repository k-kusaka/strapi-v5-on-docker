export default ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: `http://${env('STRAPI_SERVER_NAME')}`,
  app: {
    keys: env.array('APP_KEYS'),
  },
});
