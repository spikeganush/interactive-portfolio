import { writeFile, mkdir, unlink, readdir } from 'fs/promises';
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
  const file: File | null = data.get('file') as unknown as File;
  console.log(file);

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const directory = path.join(
    process.env.UPLOAD_DIR_PATH!,
    'public',
    'images',
    params.id,
    'profile'
  );
  const filePath = path.join(directory, file.name);

  // Make sure the directory exists
  await mkdir(path.dirname(filePath), { recursive: true });

  // Delete the file inside the directory if it exists
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

  // Return a success response with the path to the file
  return new Response(JSON.stringify({ path: filePath }), {
    status: 200,
  });
}
