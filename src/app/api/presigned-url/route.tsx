import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto ? for what ?

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get("fileName"); // file name
  const fileType = req.nextUrl.searchParams.get("fileType"); // file type mime
  const contentType = req.nextUrl.searchParams.get("contentType"); // profile, collection, pin-review
  const contentId = req.nextUrl.searchParams.get("contentId"); // profile-id, collection-id,
  if (
    !process.env.S3_REGION ||
    !process.env.S3_ACCESS_KEY ||
    !process.env.S3_SECRET_KEY ||
    !process.env.S3_BUCKET_NAME
  )
    return NextResponse.error();
  if (
    !fileName ||
    !fileName.match(/\.(jpg|jpeg|png)$/) ||
    !fileType ||
    !contentType ||
    !contentId
  )
    return NextResponse.error();

  const fileExtension = fileName.split(".").pop();
  const imgFileName = `${contentType}/${contentId}.${fileExtension}`; // pin-id ?

  const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imgFileName,
    ContentType: fileType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 }).catch(
    (err) => {
      console.error(err);
      return "";
    }
  );

  return NextResponse.json({
    url: url,
    imgUrl: `${process.env.S3_URL}${imgFileName}`,
  });
}
