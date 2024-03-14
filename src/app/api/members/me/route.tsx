import { NextResponse, NextRequest } from "next/server";

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
        nickname: "호기심 많은 도마뱀",
        registrationSource: "KAKAO | NAVER | GOOGLE",
        role: "ROLE_ADMIN | ROLE_MEMBER",
        avatar: "/path/to/avatar/user1.png",
        collectionCnt: 0,
        scrappedCollectionCnt: 0,
        followerCnt: 2,
        followingCnt: 0,
      },
    ],
  });
}
