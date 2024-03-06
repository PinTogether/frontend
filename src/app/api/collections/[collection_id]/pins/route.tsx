import { NextResponse, NextRequest } from "next/server";

import dummydata from "../dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection_id: string } }
) {
  console.log("GET /api/places/pins/route.tsx");
  console.log("params", params);
  return NextResponse.json(dummydata);
}
