import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

type Params = {
  userId: string;
  folderId: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
  secure: true,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { userId, folderId } = params;
    const cloudinaryFolder = `images/${userId}/projects/${folderId}`;
    await cloudinary.api.delete_resources_by_prefix(cloudinaryFolder);
    await cloudinary.api.delete_folder(cloudinaryFolder);
    return new Response(JSON.stringify({ message: 'Deleted' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
