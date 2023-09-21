import Portfolio from '@/models/portfolio';
import { DataState } from '@/types/general';
import { connectToDatabase } from '@/utils/database';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    // Validate environment variable
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL environment variable is not set');
    }

    const payload: DataState = await request.json();

    if (!payload.userId) return new Response('No id', { status: 404 });
    await connectToDatabase();

    const portfolio = await Portfolio.findOne({ creator: payload.userId });

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
};
