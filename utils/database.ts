import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'personalPortfolio',
    });
    isConnected = true;
  } catch (error) {
    console.log('MongoDB connexion error: ', error);
  }
};
