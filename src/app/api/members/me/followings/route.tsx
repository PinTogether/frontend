import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET /api/members/me/followings/route.tsx");
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 3,
    },
    results: [
     
    ],
  });
}
