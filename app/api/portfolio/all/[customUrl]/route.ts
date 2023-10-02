import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';
import { NextRequest } from 'next/server';

type Params = {
  customUrl: string;
};

export const GET = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { customUrl } = params;
      const posts = await Portfolio.findOne({ customUrl });

      return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
      return new Response('Failed to fetch all posts', { status: 500 });
    }
  }
);
