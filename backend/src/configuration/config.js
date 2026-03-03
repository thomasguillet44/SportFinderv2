const config = {
    env: process.env.NODE_ENV,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    max: 10,
    idleTimeoutMillis: 30000
};

export default config;