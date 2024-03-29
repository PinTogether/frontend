import { NextResponse, NextRequest } from "next/server";

/* 내가 팔로우하고 있는 사람 목록 조회 */
export async function GET(request: NextRequest) {
  console.log("GET /api/members/me/followings/route.tsx");
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 2,
    },
    results: [
      {
        id: 4,
        name: "",
        membername: "지혜로운 적색의 악어",
        avatar: "",
        collectionCnt: 0,
      },
      {
        id: 2,
        name: "",
        membername: "단호한 푸른 다람쥐",
        avatar: "",
        collectionCnt: 8,
      },
    ],
  });
}
