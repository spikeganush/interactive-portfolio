import Portfolio from '@/models/portfolio';
import { connectToDatabase } from '@/utils/database';

export const GET = async () => {
  try {
    await connectToDatabase;

    const posts = await Portfolio.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
};
