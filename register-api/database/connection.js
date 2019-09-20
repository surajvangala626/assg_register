var mysql = require('mysql');

const db_details = {
    host: '18.223.3.77',
    port: '3306',
    user: 'root',
    password: 'kepler111',
    database: 'register',
    connectionLimit: 200,
    multipleStatements: true
};
var connection = {
    pool: mysql.createPool(db_details)
}
connection.pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error' + JSON.stringify(err));
    } else {
        console.log('Connected to Database')
        connection.destroy();
    }
});
module.exports = connection;