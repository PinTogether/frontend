import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummydata.json";

/* 컬렉션 검색 */
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/search/collections/route.tsx");
  console.log("query, page, size", query, page, size);
  // if (Number(page) === 3) return NextResponse.json([]);
  // return NextResponse.json(dummydata);
  // console.log("query", query);
  if (query == "error") {
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

  if (Number(page) === 3)
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
  const result = dummydata.slice(
    Number(page) * Number(size),
    Number(page) * Number(size) + Number(size)
  );
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: result.length,
    },
    results: result,
  });
}
