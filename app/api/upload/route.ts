import { writeFile } from 'fs/promises';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return new Response('No file!', { status: 500 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `/images/${file.name}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return new Response('File uploaded!', { status: 200 });
}
