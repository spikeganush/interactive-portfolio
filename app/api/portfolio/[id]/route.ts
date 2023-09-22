import Portfolio from '@/models/portfolio';
import { connectToDatabase } from '@/utils/database';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
};

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    console.log('/api/portfolio/[id]/route.ts GET', params.id);
    await connectToDatabase();
    if (!params.id) return new Response('No id', { status: 404 });

    const portfolio = await Portfolio.findOne({ creator: params.id });
    console.log(portfolio);

    if (!portfolio) {
      return new Response('Portfolio not found', { status: 404 });
    }
    return new Response(JSON.stringify(portfolio), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch all posts', { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const { portfolio } = await request.json();
    await connectToDatabase();

    if (!params.id) return new Response('No id', { status: 404 });
    const existingPortfolio = await Portfolio.findOne({ creator: params.id });

    if (!existingPortfolio) {
      return new Response('Portfolio not found', { status: 404 });
    }

    for (const key in portfolio) {
      if (key === 'userId') {
        existingPortfolio['creator'] = portfolio[key];
      } else {
        existingPortfolio[key] = portfolio[key];
      }
    }

    await existingPortfolio.save();

    return new Response('Successfully updated the portfolio', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update portfolio', { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectToDatabase();

    await Portfolio.findByIdAndRemove(params.id);

    return new Response('Successfully deleted the portfolio', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete portfolio', { status: 500 });
  }
};
