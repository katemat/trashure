const pg = require('pg');

const pool = new pg.Pool({
    database: 'trashure'
})

module.exports = {
    query: (sql, params, callback) => {
        return pool.query(sql, params, callback)
    }
}