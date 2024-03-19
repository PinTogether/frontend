import { NextResponse, NextRequest } from "next/server";

// import dummydata1 from "./dummydata.json";
// import dummydata2 from "./dummydata2.json";
// import dummydata3 from "./dummydata3.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection_id: string } }
) {
  console.log("GET /api/collections/[collection_id]/route.tsx");
  console.log("params", params);
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 1,
    },
    results: [
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 8,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: false,
        liked: false,
      },
    ],
  });
}
