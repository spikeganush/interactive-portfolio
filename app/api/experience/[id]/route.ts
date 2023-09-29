import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
};

export const POST = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { id } = params;
      if (!id) {
        return new Response('Missing id', { status: 400 });
      }
      const experience = await request.json();

      if (!experience) {
        return new Response('Missing experience', { status: 400 });
      }
      console.log({ id, experience });
      const data = await Portfolio.updateOne(
        { creator: id },
        { $push: { experiences: experience } }
      );
      console.log({ id, experience, data });
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response('Failed to add experience', { status: 500 });
    }
  }
);
