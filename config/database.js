const mysql = require('mysql');
// buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3030,
    user: process.env.MYSQL_USER || 'CF',
    password: process.env.MYSQL_PASSWORD || 'nawadata',
    database: process.env.MYSQL_DBNAME || 'cfdb',
    multipleStatements: true
});
// koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;


