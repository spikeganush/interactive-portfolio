import Portfolio from '@/models/portfolio';
import { connectToDatabase } from '@/utils/database';

type Params = {
  id: string;
};

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectToDatabase;

    const portfolio = await Portfolio.findOne({ creator: params.id }).populate(
      'creator'
    );

    if (!portfolio) {
      return new Response('Portfolio not found', { status: 404 });
    }
    return new Response(JSON.stringify(portfolio), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { portfolio } = await request.json();
  try {
    await connectToDatabase;

    const existingPortfolio = await Portfolio.findById(params.id);

    if (!existingPortfolio) {
      return new Response('Portfolio not found', { status: 404 });
    }

    for (const key in portfolio) {
      existingPortfolio[key] = portfolio[key];
    }

    await existingPortfolio.save();

    return new Response('Successfully updated the portfolio', { status: 200 });
  } catch (error) {
    return new Response('Failed to update portfolio', { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectToDatabase;

    await Portfolio.findByIdAndRemove(params.id);

    return new Response('Successfully deleted the portfolio', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete portfolio', { status: 500 });
  }
};
