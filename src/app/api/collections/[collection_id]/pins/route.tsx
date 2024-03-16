import { NextResponse, NextRequest } from "next/server";

import dummydata1 from "../dummydata.json";
import dummydata2 from "../dummydata2.json";
import dummydata3 from "../dummydata3.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection_id: string } }
) {
  console.log("GET /api/places/pins/route.tsx");
  console.log("params", params);
  if(params.collection_id == "1"){
    return NextResponse.json(dummydata1);
  }
  else if (params.collection_id == "2"){
    return NextResponse.json(dummydata2);
  }
  return NextResponse.json(dummydata3);
}
