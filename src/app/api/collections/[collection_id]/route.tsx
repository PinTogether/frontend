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
  if (params.collection_id == "0") {
    return NextResponse.json(
      {
        status: {
          code: 404,
          message: "Not Found",
        },
        metadata: {
          resultCount: 0,
        },
        results: [],
      },
      {
        status: 404,
      }
    );
  }

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
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
      {
        id: 12,
        title: "eunjil's kitchen",
        details: "update matzip",
        writerId: 3,
        writer: "하하",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 10,
        pinCnt: 0,
        scrapCnt: 0,
        tags: ["chicken22", "jmt22"],
        scrapped: true,
        liked: true,
      },
    ],
  });
}
