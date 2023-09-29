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
        $pull: { experiences: { id: id } },
      });

      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.log({ error });
      return new Response('Failed to delete experience', { status: 500 });
    }
  }
);

export const PUT = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { id, portfolioId } = params;
      if (!id || !portfolioId) return new Response('No id', { status: 404 });
      const experience = await request.json();

      if (!experience) return new Response('No experience', { status: 404 });
      const data = await Portfolio.findOneAndUpdate(
        { _id: portfolioId, 'experiences.id': id },
        { $set: { 'experiences.$': experience } },
        { new: true }
      );
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response('Failed to update experience', { status: 500 });
    }
  }
);
