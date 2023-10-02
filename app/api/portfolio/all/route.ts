import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';

export const GET = withDatabaseConnection(async () => {
  try {
    const posts = await Portfolio.find({});

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
});
