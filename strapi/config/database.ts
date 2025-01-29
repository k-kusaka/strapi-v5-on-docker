import path from 'path';

export default ({ env }) => {
  const client = env('STRAPI_DATABASE_CLIENT', 'sqlite');

  const connections = {
    mysql: {
      connection: {
        host: env('STRAPI_DATABASE_HOST', 'localhost'),
        port: env.int('STRAPI_DATABASE_PORT', 3306),
        database: env('STRAPI_DATABASE_NAME', 'strapi'),
        user: env('STRAPI_DATABASE_USERNAME', 'strapi'),
        password: env('STRAPI_DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('STRAPI_DATABASE_SSL', false) && {
          key: env('STRAPI_DATABASE_SSL_KEY', undefined),
          cert: env('STRAPI_DATABASE_SSL_CERT', undefined),
          ca: env('STRAPI_DATABASE_SSL_CA', undefined),
          capath: env('STRAPI_DATABASE_SSL_CAPATH', undefined),
          cipher: env('STRAPI_DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('STRAPI_DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('STRAPI_DATABASE_POOL_MIN', 2), max: env.int('STRAPI_DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('STRAPI_DATABASE_URL'),
        host: env('STRAPI_DATABASE_HOST', 'localhost'),
        port: env.int('STRAPI_DATABASE_PORT', 5432),
        database: env('STRAPI_DATABASE_NAME', 'strapi'),
        user: env('STRAPI_DATABASE_USERNAME', 'strapi'),
        password: env('STRAPI_DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('STRAPI_DATABASE_SSL', false) && {
          key: env('STRAPI_DATABASE_SSL_KEY', undefined),
          cert: env('STRAPI_DATABASE_SSL_CERT', undefined),
          ca: env('STRAPI_DATABASE_SSL_CA', undefined),
          capath: env('STRAPI_DATABASE_SSL_CAPATH', undefined),
          cipher: env('STRAPI_DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('STRAPI_DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('STRAPI_DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('STRAPI_DATABASE_POOL_MIN', 2), max: env.int('STRAPI_DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('STRAPI_DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    options: {
      "debug": env.bool('DEBUG_MODE', false)
    }
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('STRAPI_DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
