import Portfolio from '@/models/portfolio';
import { DataState } from '@/types/general';
import { connectToDatabase } from '@/utils/database';
import { c } from '@vercel/blob/dist/put-6f84b94d';
import { NextRequest } from 'next/server';

export const GET = async () => {
  try {
    await connectToDatabase();

    const posts = await Portfolio.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const payload: DataState = await request.json();

    await connectToDatabase();

    const portfolio = payload.userId
      ? await Portfolio.findOne({ creator: payload.userId })
      : null;

    if (portfolio) {
      // Directly update the database
      Object.assign(portfolio, payload);
      const result = await portfolio.save();
      console.log({ result });
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
