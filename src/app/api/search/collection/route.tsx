import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/bookmarks/[place_id]/route.tsx");
  console.log("params", params);
  console.log("query, page, size", query, page, size);
  if (Number(page) === 3) return NextResponse.json([]);
  return NextResponse.json(dummydata);
}
