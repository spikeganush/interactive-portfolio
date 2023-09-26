import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';
import { DataState } from '@/types/general';
import { NextRequest } from 'next/server';

export const GET = withDatabaseConnection(async () => {
  try {
    const posts = await Portfolio.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
});

export const POST = withDatabaseConnection(async (request: NextRequest) => {
  try {
    const payload: DataState = await request.json();

    const portfolio = payload.userId
      ? await Portfolio.findOne({ creator: payload.userId })
      : null;

    if (portfolio) {
      // Directly update the database
      Object.assign(portfolio, payload);
      await portfolio.save();

      return new Response('Portfolio updated successfully!', { status: 200 });
    } else {
      const newPortfolio = new Portfolio({
        creator: payload.userId,
        ...payload,
      });

      await newPortfolio.save();

      return new Response(JSON.stringify(newPortfolio), { status: 201 });
    }
  } catch (error) {
    console.log({ error });
    return new Response(`Failed to save the portfolio: ${error}`, {
      status: 500,
    });
  }
});
