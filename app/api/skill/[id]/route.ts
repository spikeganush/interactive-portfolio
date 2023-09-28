import { withDatabaseConnection } from '@/lib/server-utils';
import Portfolio from '@/models/portfolio';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
};

export const PUT = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { id } = params;
      if (!id) {
        return new Response('Missing id', { status: 400 });
      }
      const skill = await request.json();

      console.log({ id, skills: skill });

      if (!skill) {
        return new Response('Missing skill', { status: 400 });
      }
      const data = await Portfolio.updateOne(
        { _id: id },
        { $push: { skills: skill } }
      );
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response('Failed to add skill', { status: 500 });
    }
  }
);

export const DELETE = withDatabaseConnection(
  async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const { id } = params;
      if (!id) {
        return new Response('Missing id', { status: 400 });
      }
      const skill = await request.json();

      if (!skill) {
        return new Response('Missing skill', { status: 400 });
      }
      const data = await Portfolio.updateOne(
        { _id: id },
        { $pull: { skills: skill } }
      );
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response('Failed to add skill', { status: 500 });
    }
  }
);
