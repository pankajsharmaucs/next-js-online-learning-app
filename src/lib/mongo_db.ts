import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose.connections[0];
    }
    
    const db = await mongoose.connect(process.env.MONGODB_URL!);
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed');
  }
};

export { connectDB };
