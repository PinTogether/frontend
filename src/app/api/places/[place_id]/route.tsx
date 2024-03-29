import { NextResponse, NextRequest } from "next/server";

/* 특정 장소 정보 조회 */
export async function GET(
  request: NextRequest,
  { params }: { params: { place_id: string } }
) {
  console.log("GET /api/places/[place_id]/route.tsx");
  console.log("params", params);
  // return NextResponse.json(
  //   {
  //     status: {
  //       code: 404,
  //       message: "Not Found",
  //     },
  //     metadata: {
  //       resultCount: 0,
  //     },
  //     results: [],
  //   },
  //   {
  //     status: 404,
  //   }
  // );
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
        id: 524372,
        name: "왕십리곱창구이 . 혜화점",
        roadNameAddress: "서울특별시 종로구 명륜길 13, 1층 (명륜3가)",
        pinCnt: 1,
        latitude: 37.588027829867926,
        longitude: 126.99598227828525,
        category: "음식점>한식",
        starred: false,
      },
    ],
  });
}
