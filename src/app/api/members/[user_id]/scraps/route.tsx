import { NextResponse, NextRequest } from "next/server";

/* 특정 유저의 스크랩한 콜렉션들 조회 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/members/[user_id]/scraps/route.tsx");
  console.log("params", params);
  console.log("page, size", page, size);
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
  if (Number(page) == 3) {
    return NextResponse.json({
      status: {
        code: 200,
        message: "OK",
      },
      metadata: {
        resultCount: 0,
      },
      results: [],
    });
  }
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
        id: 133,
        title: "야호",
        writerId: 12,
        writerMembername: "깨끗한 보라빛의 치타타타타랄",
        thumbnail: "https://picsum.photos/id/326/300",
        likeCnt: 1,
        pinCnt: 4,
        scrapCnt: 1,
        scrapped: true,
        liked: false,
      },
      {
        id: 101,
        title: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/collection/THUMBNAIL:101-20240325 04:13:20KST-9023a55b-bf26-47aa-886b-2da5795c0581.jpeg",
        likeCnt: 4,
        pinCnt: 9,
        scrapCnt: 2,
        scrapped: true,
        liked: true,
      },
    ],
  });
}
