import { NextResponse, NextRequest } from "next/server";

/* 컬렉션 검색 */
export async function GET(request: NextRequest) {
  console.log("GET /api/search/route.tsx");

  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 2,
    },
    results: [
      {
        id: 3,
        query: "왕십",
      },
      {
        id: 1,
        query: "qwefw",
      },
    ],
  });
}
