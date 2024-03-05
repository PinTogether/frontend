import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { place_id: string } }
) {
  console.log("GET /api/places/[place_id]/route.tsx");
  console.log("params", params);
  return NextResponse.json(dummydata);
}
