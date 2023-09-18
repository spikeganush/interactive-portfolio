import Portfolio from '@/models/portfolio';
import { DataState } from '@/types/general';
import { connectToDatabase } from '@/utils/database';

export const POST = async (request: Request) => {
  try {
    const payload: DataState = await request.json();

    await connectToDatabase();

    const newPortfolio = new Portfolio({
      creator: payload.userId,
      ...payload,
    });

    await newPortfolio.save();

    return new Response(JSON.stringify(newPortfolio), { status: 201 });
  } catch (error) {
    console.log({ error });
    return new Response(`Failed to save the portfolio: ${error}`, {
      status: 500,
    });
  }
};
