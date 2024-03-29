import { NextResponse, NextRequest } from "next/server";

/* 특정 유저 정보 조회 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  console.log("GET /api/members/[user_id]/route.tsx");
  console.log("params", params);

  // return NextResponse.json(
  //   {
  //     status: {
  //       code: 404,
  //       message: "NOT FOUND",
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
        name: "은지공주",
        membername: "eunji_princess_11",
        avatar: "",
        bio: "최애 음식 초밥, 족발입니다.",
        collectionCnt: 39,
        scrappedCollectionCnt: 2,
        followerCnt: 1,
        followingCnt: 2,
        followed: false,
      },
    ],
  });
}
