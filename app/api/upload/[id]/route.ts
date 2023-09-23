import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

type Params = {
  id: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
  secure: true,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const data = await request.formData();

    const file = data.get('file') as File;
    const folderToUpload = data.get('folder') as string;
    const folderId = data.get('folderId') as string | null;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cloudinaryFolder = `${
      folderToUpload === 'resume' ? 'resumes/' : 'images/'
    }${params.id}/${
      folderToUpload === 'resume'
        ? ''
        : `${folderToUpload}/${folderId ? folderId : ''}`
    }`;

    await cloudinary.api.delete_resources_by_prefix(cloudinaryFolder);

    // Wrap the Cloudinary upload in a Promise
    const uploadToCloudinary = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: cloudinaryFolder,
          use_filename: folderToUpload === 'resume' ? true : false,
          filename_override:
            folderToUpload === 'resume' ? file.name : undefined,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      let uploadBytes = 0;
      const totalBytes = buffer.length;
      const readStream = streamifier.createReadStream(buffer);

      readStream.on('data', (chunk) => {
        uploadBytes += chunk.length;
        const progress = Math.round((uploadBytes / totalBytes) * 100);
        console.log(`Progress: ${progress}%`);
      });
      readStream.pipe(stream);
    });

    // Await the Promise and handle the result
    try {
      const result = await uploadToCloudinary;
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      console.log('Upload failed:', error);
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
