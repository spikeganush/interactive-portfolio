import Portfolio from '@/models/portfolio';
import { connectToDatabase } from '@/utils/database';
import { request } from 'http';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
  portfolioId: string;
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const { id, portfolioId } = params;
    if (!id || !portfolioId) return new Response('No id', { status: 404 });

    await connectToDatabase();

    const data = await Portfolio.findByIdAndUpdate(portfolioId, {
      $pull: { projects: { id: id } },
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log({ error });
    return new Response('Failed to delete project', { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const { id, portfolioId } = params;
    const { project } = await request.json();
    await connectToDatabase();
    const data = await Portfolio.updateOne(
      { creator: portfolioId },
      { $set: { projects: { id: id } } }
    );
  } catch (error) {
    return new Response('Failed to update project', { status: 500 });
  }
};
