import { NextResponse, NextRequest } from "next/server";

import dummydata from "../../dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const offset = request.nextUrl.searchParams.get("offset");
  const limit = request.nextUrl.searchParams.get("limit");
  console.log("GET /api/members/[user_id]/scraps/route.tsx");
  console.log("params", params);
  console.log("offset, limit", offset, limit);
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: dummydata.length,
    },
    results: dummydata,
  });
}
