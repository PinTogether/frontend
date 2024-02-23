import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummydata.json";

export async function GET(request: NextRequest) {
  console.log("GET /api/bookmarks/route.tsx");
  return NextResponse.json(dummydata);
}
