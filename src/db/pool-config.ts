import {PoolConfig} from "pg";

export const getPoolConfig = (): PoolConfig  => ({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: +(process.env.PG_PORT ?? 6543),
    database: process.env.PG_DATABASE,
    max: 20,
    connectionTimeoutMillis: 5000,
    ssl: {
        rejectUnauthorized: false,
    },
})


