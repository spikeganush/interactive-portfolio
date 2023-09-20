import { writeFile, mkdir, readdir, unlink } from 'fs/promises';
import { NextRequest } from 'next/server';
import path from 'path';

type Params = {
  id: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const directory = path.join(
    process.env.UPLOAD_DIR_PATH!,
    'public',
    'images',
    params.id,
    'profile'
  );
  const filePath = path.join(directory, file.name);
  const filePathToReturn = path.join('images', params.id, 'profile', file.name);

  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    const files = await readdir(directory);
    const unlinkPath = path.join(directory, files[0]);
    await unlink(unlinkPath);
    console.log(`Existing file at ${filePath} has been deleted.`);
  } catch (error) {
    console.log(`No existing file at ${filePath}.`);
  }

  await writeFile(filePath, buffer);

  console.log(`open ${filePath} to see the uploaded file`);

  return new Response(JSON.stringify({ path: filePathToReturn }), {
    status: 200,
  });
}
