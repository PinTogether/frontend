import { NextResponse, NextRequest } from "next/server";

/* 특정 유저의 콜렉션들 조회 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/members/[user_id]/collections/route.tsx");
  console.log("params", params);
  console.log("page, size", page, size);

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
      resultCount: 10,
    },
    results: [
      {
        id: 135,
        title: "소고기 맛집",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/collection/THUMBNAIL:135-20240328 05:33:26KST-bc7c7ffc-b604-40ab-99cf-6b765a4a509a.jpeg",
        likeCnt: 3,
        pinCnt: 2,
        scrapCnt: 0,
        scrapped: false,
        liked: true,
      },
      {
        id: 118,
        title: "eunjil's kitchen",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 116,
        title: "eunjil's kitchen",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 115,
        title: "타이틀1",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 114,
        title: "eunjil's kitchen",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail: "https://picsum.photos/200",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 49,
        title: "title6",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
        likeCnt: 1,
        pinCnt: 0,
        scrapCnt: 1,
        scrapped: false,
        liked: false,
      },
      {
        id: 48,
        title: "title6",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 47,
        title: "title6",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 46,
        title: "title6",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
        likeCnt: 0,
        pinCnt: 0,
        scrapCnt: 0,
        scrapped: false,
        liked: false,
      },
      {
        id: 56,
        title: "떡볶이 맛집",
        writerId: 8,
        writerMembername: "eunji_princess_11",
        thumbnail:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
        likeCnt: 4,
        pinCnt: 0,
        scrapCnt: 1,
        scrapped: false,
        liked: true,
      },
    ],
  });
}
