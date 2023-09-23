import { v2 as cloudinary } from 'cloudinary';

export async function deleteFileAndFolderFromCloudinaryProjects(
  userId: string,
  folderId: string
) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!,
    secure: true,
  });
  const cloudinaryFolder = `images/${userId}/projects/${folderId}`;
  return await cloudinary.api.delete_resources_by_prefix(cloudinaryFolder);
}
