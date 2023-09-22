import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  console.log('Starting MongoDB connexion');
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'personalPortfolio',
    });
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB connexion error: ', error);
  }
};
