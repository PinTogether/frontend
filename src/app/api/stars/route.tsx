import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET /api/stars/route.tsx");
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
  // return NextResponse.json({
  //   status: {
  //     code: 200,
  //     message: "OK",
  //   },
  //   metadata: {
  //     resultCount: 1,
  //   },
  //   results: [
  //     {
  //       updatedAt: "2023-10-12T15:17:00",
  //       id: 524372,
  //       address: {
  //         roadNameAddress: "서울특별시 종로구 명륜길 13, 1층 (명륜3가)",
  //         numberAddress: "서울특별시 종로구 명륜3가 2-33 ",
  //         latitude: 199575.5573,
  //         longitude: 453969.0137,
  //       },
  //       placeSource: null,
  //       placeSourceId: null,
  //       phone: null,
  //       name: "왕십리곱창구이 . 혜화점",
  //       category: "음식점>한식",
  //       businessHour: null,
  //     },
  //   ],
  // });
}
