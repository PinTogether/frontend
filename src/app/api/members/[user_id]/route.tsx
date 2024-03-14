import { NextResponse, NextRequest } from "next/server";

// import dummydata from "../../dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  console.log("GET /api/bookmarks/[place_id]/route.tsx");
  console.log("params", params);
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
        nickname: "독특한 노오란 소",
        avatar: "https://picsum.photos/200",
        collectionCnt: 0,
        scrappedCollectionCnt: 0,
        followerCnt: 0,
        followingCnt: 0,
        followed: false,
      },
    ],
  });
}
