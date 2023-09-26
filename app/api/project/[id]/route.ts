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
      const project = await request.json();

      if (!project) {
        return new Response('Missing project', { status: 400 });
      }
      const data = await Portfolio.updateOne(
        { creator: id },
        { $push: { projects: project } }
      );
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response('Failed to add project', { status: 500 });
    }
  }
);
