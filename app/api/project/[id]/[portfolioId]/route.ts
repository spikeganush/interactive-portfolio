import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
  portfolioId: string;
};

export const DELETE = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { id, portfolioId } = params;
      if (!id || !portfolioId) return new Response('No id', { status: 404 });

      const data = await Portfolio.findByIdAndUpdate(portfolioId, {
        $pull: { projects: { id: id } },
      });

      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.log({ error });
      return new Response('Failed to delete project', { status: 500 });
    }
  }
);

export const PUT = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { id, portfolioId } = params;
      if (!id || !portfolioId) return new Response('No id', { status: 404 });
      const project = await request.json();

      if (!project) return new Response('No project', { status: 404 });
      const data = await Portfolio.findOneAndUpdate(
        { _id: portfolioId, 'projects.id': id },
        { $set: { 'projects.$': project } },
        { new: true }
      );
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response('Failed to update project', { status: 500 });
    }
  }
);
