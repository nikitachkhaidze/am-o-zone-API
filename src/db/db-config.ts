export const getDBConfig = () => ({
  client: 'pg',
  version: '7.2',
  connection: {
    host: process.env.PG_HOST,
    port: +(process.env.PG_PORT ?? 3221),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    connectionTimeoutMillis: 5000,
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      max: 20,
      min: 0,
    },
  },
});
