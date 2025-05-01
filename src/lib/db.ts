
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '119.18.54.135',
  user: process.env.DB_USER || 'elfedxvv_sm',
  password: process.env.DB_PASSWORD || 'Asdf@333###',
  database: process.env.DB_NAME || 'elfedxvv_edusm',
  waitForConnections: true,
  connectionLimit: 10, // Change based on your expected load
  queueLimit: 0
});

export const connectDB = async () => {
  return pool.getConnection();
};