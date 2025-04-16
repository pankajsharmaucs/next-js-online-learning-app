// lib/db.ts
import mysql from 'mysql2/promise';

export const connectDB = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST || '119.18.54.135',
    user: process.env.DB_USER || 'elfedxvv_sm',
    password: process.env.DB_PASSWORD || 'Asdf@333###',
    database: process.env.DB_NAME || 'elfedxvv_edusm',
  });
};
