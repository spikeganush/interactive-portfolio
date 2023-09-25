import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const file = data.get('file') as File;
    const blob = await put(file.name, file, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('An error occurred:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();
    await del(url);
    return new Response('Successfully deleted the file', { status: 200 });
  } catch (error) {
    console.error('An error occurred:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error }),
      {
        status: 500,
      }
    );
  }
}
