import { S3 } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function awsUploader(req: NextApiRequest, res: NextApiResponse) {
  const S3Client = new S3({
    region: 'eu-west-1',
    credentials: {
      accessKeyId: process.env.S3_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.S3_AWS_SECRET_KEY!,
    },
  });

  const { filename, contentType } = req.body;

  try {
    const fileParams = {
      Bucket: process.env.S3_AWS_BUCKET_NAME!,
      Key: filename,
      ContentType: contentType,
    };

    const { url, fields } = await createPresignedPost(S3Client, fileParams);

    res.status(200).json({ success: true, url, fields });
  } catch (error) {
    res.status(400).json({ success: false });
    console.error('AWS S3 API - upload_file.tsx - POST Error:', error);
  }
}
