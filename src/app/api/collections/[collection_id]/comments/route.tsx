import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummy-collection-reply.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection_id: string } }
) {
  console.log("GET /api/collections/[collection_id]/pins/route.tsx");
  console.log("params", params);
  if (params.collection_id == "1") {
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
