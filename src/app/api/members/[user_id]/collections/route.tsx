import { NextResponse, NextRequest } from "next/server";

import dummydata from "../../dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/members/[user_id]/collections/route.tsx");
  console.log("params", params);
  console.log("page, size", page, size);

  if (Number(page) == 3) {
    return NextResponse.json({
      status: {
        code: 200,
        message: "OK",
      },
      metadata: {
        resultCount: 0,
      },
      results: [],
    });
  }

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
  // return NextResponse.json({
  //   status: {
  //     code: 200,
  //     message: "OK",
  //   },
  //   metadata: {
  //     resultCount: 0,
  //   },
  //   results: [],
  // });
}
