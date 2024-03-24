import { NextResponse, NextRequest } from "next/server";

import dummydata1 from "./dummydata.json";
import dummydata2 from "./dummydata2.json";
import dummydata3 from "./dummydata3.json";

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
        resultCount: 0,
      },
      results: [],
    });
  } else if (params.collection_id == "2") {
    return NextResponse.json({
      status: {
        code: 200,
        message: "OK",
      },
      metadata: {
        resultCount: 1,
      },
      results: dummydata2,
    });
  }
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 1,
    },
    results: dummydata3,
  });
}
