// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     if (mongoose.connections[0].readyState) {
//       return mongoose.connections[0];
//     }

//     const db = await mongoose.connect(process.env.MONGODB_URL!);
//     return db;
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     throw new Error('Database connection failed');
//   }
// };

// export { connectDB };


// lib/mongo_db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URL environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize the cache if it doesn't exist yet
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

const cached = global.mongooseCache;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'test', });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
