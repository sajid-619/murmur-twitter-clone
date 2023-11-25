import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'docker',
  password: 'docker',
  database: 'test'
});

export default connection;