const mysql = require('mysql');
const { promisify } = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexion fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La conexion tiene muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexion fue rechazada');
        }             
    }
    if (connection) connection.release();
    console.log('La base de datos fue conectada');
    return;
});

pool.query = promisify(pool.query);
module.exports = pool; 
