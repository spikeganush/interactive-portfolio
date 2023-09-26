import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
};

export const GET = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      if (!params.id) return new Response('No id', { status: 404 });

      const portfolio = await Portfolio.findOne({ creator: params.id });

      if (!portfolio) {
        return new Response('Portfolio not found', { status: 404 });
      }
      return new Response(JSON.stringify(portfolio), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response('Failed to fetch all posts', { status: 500 });
    }
  }
);

export const PATCH = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { portfolio } = await request.json();

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

      return new Response('Successfully updated the portfolio', {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Failed to update portfolio', { status: 500 });
    }
  }
);

export const DELETE = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      await Portfolio.findByIdAndRemove(params.id);

      return new Response('Successfully deleted the portfolio', {
        status: 200,
      });
    } catch (error) {
      return new Response('Failed to delete portfolio', { status: 500 });
    }
  }
);
