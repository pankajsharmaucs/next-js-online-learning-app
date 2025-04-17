import bcrypt from 'bcrypt';
import crypto from 'crypto';

// For symmetric encryption (for decryptable secrets like tokens, etc.)
const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.ENCRYPT_SECRET_KEY || 'mydefaultsecretkey123456789012'; // 32 chars
const IV = Buffer.from('1234567890123456'); // 16 bytes IV

// 🔐 1. Hash password (one-way)
export async function hashPassword(plain: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(plain, saltRounds);
}

// 🔍 2. Compare hashed password
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}
 
