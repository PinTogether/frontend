import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic"; // defaults to auto ? for what ?

export async function DELETE(req: NextRequest) {
  const { targetName } = await req.json();

  if (
    !process.env.S3_REGION ||
    !process.env.S3_ACCESS_KEY ||
    !process.env.S3_SECRET_KEY ||
    !process.env.S3_BUCKET_NAME
  )
    return NextResponse.error();
  if (!targetName) return NextResponse.error();

  const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME, // required
    Key: targetName, // required
  });

  const response = await client.send(command);

  return NextResponse.json({ status: response.$metadata.httpStatusCode });
}
