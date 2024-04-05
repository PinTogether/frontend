import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummydata.json";

/* 장소 검색 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log(
    "GET /api//search/pins?query=${searchKeyword}&page=${page}&size=${size}"
  );
  console.log("params", params);
  console.log("query, page, size", query, page, size);
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
