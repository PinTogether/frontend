import { NextResponse, NextRequest } from "next/server";

/* 내 정보 조회 */
export async function GET(request: NextRequest) {
  console.log("GET /api/members/me/route.tsx");
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
        id: 8,
        name: "은지공주",
        membername: "eunji_princess_11",
        bio: "최애 음식 초밥, 족발입니다.",
        registrationSource: "GOOGLE",
        role: "ROLE_MEMBER",
        avatar:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/profile1.png",
        collectionCnt: 39,
        scrappedCollectionCnt: 2,
        followerCnt: 1,
        followingCnt: 2,
      },
    ],
  });
}
