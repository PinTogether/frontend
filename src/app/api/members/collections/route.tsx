import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const placeId = request.nextUrl.searchParams.get("placeId");

  console.log("GET /api/members/[user_id]/collections/route.tsx");
  console.log("params", params);
  console.log("placeId", placeId);

  if (placeId) {
    return NextResponse.json({
      status: {
        code: 200,
        message: "OK",
      },
      metadata: {
        resultCount: 34,
      },
      results: [
        {
          id: 43,
          title: "title5",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 1,
          pinCnt: 0,
          scrapCnt: 0,
          pinned: true,
        },
        {
          id: 46,
          title: "title6",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 0,
          pinCnt: 0,
          scrapCnt: 0,
          pinned: true,
        },
        {
          id: 47,
          title: "title6",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 0,
          pinCnt: 0,
          scrapCnt: 0,
          pinned: false,
        },
      ],
    });
  }
}
