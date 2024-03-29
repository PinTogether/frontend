import { NextResponse, NextRequest } from "next/server";

/* 나를 팔로우하고 있는 사람 목록 조회 */
export async function GET(request: NextRequest) {
  console.log("GET /api/members/me/followers/route.tsx");
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
        id: 3,
        name: "",
        membername: "최고급 짱구 콧털털이",
        avatar: "",
        collectionCnt: 59,
      },
    ],
  });
}
