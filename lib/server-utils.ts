'use server';

import { connectToDatabase } from '@/utils/database';

export const withDatabaseConnection =
  (callback: Function) =>
  async (...args: any[]) => {
    await connectToDatabase();
    return callback(...args);
  };
