const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'item',
    password: 'root',
    port: 5433
})

module.exports = pool;