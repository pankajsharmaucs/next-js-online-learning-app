
import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || '119.18.54.135',
//   user: process.env.DB_USER || 'elfedxvv_sm',
//   password: process.env.DB_PASSWORD || 'Asdf@333###',
//   database: process.env.DB_NAME || 'elfedxvv_edusm',
//   waitForConnections: true,
//   connectionLimit: 10000, // Change based on your expected load
//   queueLimit: 0,
//   connectTimeout: 10000,  // Timeout for initial connection
// });


const pool = mysql.createPool({
  host: process.env.DB_HOST || '68.183.83.53',
  user: process.env.DB_USER || 'kreditaid',
  password: process.env.DB_PASSWORD || 'dbkreditaid@@@123UCS',
  database: process.env.DB_NAME || 'test',
  waitForConnections: true,
  connectionLimit: 10000, // Change based on your expected load
  queueLimit: 0,
  connectTimeout: 10000,  // Timeout for initial connection
});

export const connectDB = async () => {
  return pool.getConnection();
};
