import { NextResponse, NextRequest } from "next/server";

/* 핀 추가할 내 콜렉션들 조회 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const placeId = request.nextUrl.searchParams.get("place-id");

  console.log("GET /api/members/[user_id]/collections/route.tsx");
  console.log("params", params);
  console.log("place-id", placeId);

  if (placeId) {
    return NextResponse.json({
      status: {
        code: 200,
        message: "OK",
      },
      metadata: {
        resultCount: 5,
      },
      results: [
        {
          id: 46,
          title: "title6",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 0,
          pinCnt: 0,
          scrapCnt: 0,
          pinned: false,
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
        {
          id: 48,
          title: "title6",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 0,
          pinCnt: 0,
          scrapCnt: 0,
          pinned: false,
        },
        {
          id: 49,
          title: "title6",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 1,
          pinCnt: 0,
          scrapCnt: 1,
          pinned: false,
        },
        {
          id: 56,
          title: "떡볶이 맛집",
          thumbnail:
            "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
          likeCnt: 1,
          pinCnt: 0,
          scrapCnt: 0,
          pinned: false,
        },
      ],
    });
  }
}
