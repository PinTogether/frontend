import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET /api/members/me/followers/route.tsx");
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 3,
    },
    results: [
      {
        id: 3,
        nickname: "독특한 노오란 소",
        avatar: "https://picsum.photos/200",
        collectionCnt: 0,
      },
      {
        id: 1,
        nickname: "착한 양",
        avatar: "https://picsum.photos/200",
        collectionCnt: 0,
      },
      {
        id: 2,
        nickname: "단호한 푸른 다람쥐",
        avatar: "https://picsum.photos/200",
        collectionCnt: 0,
      },
    ],
  });
}
