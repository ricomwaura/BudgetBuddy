/**
 * Database IP address.
 */
const hostAddress: string = process.env.DB_HOST;
/**
 * Database user.
 */
const dbUser: string = process.env.DB_USER;
/**
 * Database password.
 */
const dbPass: string = process.env.DB_PASS;
/**
 * Database name.
 */
const dbName: string = process.env.DB_NAME;
/**
 * Database port.
 */
const dbPort: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

/**
 * Pool configurations for PostgreSQL connections.
 */
const config = {
    host: hostAddress,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    database: dbName,
    max: 10,
    idleTimoutMillis: 30000,
    connectionTimeoutMillis: 5000
}

/**
 * Export the PoolConfig object for PostgreSQL connection.
 */
export default config;