import { NextResponse, NextRequest } from "next/server";

/* 찜한 모든 장소 조회 */
export async function GET(request: NextRequest) {
  console.log("GET /api/reports/route.tsx");
  // return NextResponse.json({
  //   status: {
  //     code: 200,
  //     message: "OK",
  //   },
  //   metadata: {
  //     resultCount: 0,
  //   },
  //   results: [],
  // });
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
        id: 1,
        platformType: "COLLECTION",
        reporterId: 5,
        reporterMembername: "eunjilee",
        targetMemberId: 8,
        targetMembername: "taehyung22",
        createdAt: "41분 전",
        progress: "ACCEPTED",
        complaintCategory: "SPAM",
        reason: "신고하는 이유",
        targetId: 19,
      },
      {
        id: 1,
        platformType: "COLLECTION",
        reporterId: 5,
        reporterMembername: "eunjilee",
        targetMemberId: 8,
        targetMembername: "taehyung22",
        createdAt: "41분 전",
        progress: "ACCEPTED",
        complaintCategory: "SPAM",
        reason: "신고하는 이유",
        targetId: 19,
      },
    ],
  });
}
