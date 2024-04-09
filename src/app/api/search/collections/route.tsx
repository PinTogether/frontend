import { CollectionDetail } from "@/types/Collection";
import { NextResponse, NextRequest } from "next/server";

/* 컬렉션 검색 */
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/search/collections/route.tsx");
  console.log("query, page, size", query, page, size);
  // if (Number(page) === 3) return NextResponse.json([]);
  // return NextResponse.json(dummydata);
  // console.log("query", query);
  if (query == "error") {
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

  if (Number(page) === 3)
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
  const result = dummydata.slice(
    Number(page) * Number(size),
    Number(page) * Number(size) + Number(size)
  );
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: result.length,
    },
    results: result,
  });
}

const dummydata: CollectionDetail[] = [
  {
    id: 139,
    title: "PINPIN",
    details: "야호",
    writerId: 12,
    writerMembername: "깨끗한 보라빛의 치타타타타랄",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/collection/THUMBNAIL:139-20240328 09:22:30KST-1d1e6a9d-e03d-48cf-8cb9-d6bdd87f5ff0.jpeg",
    likeCnt: 1,
    collectionPinCnt: 0,
    scrapCnt: 0,
    tags: ["bc"],
    scrapped: false,
    liked: false,
  },
  {
    id: 138,
    title: "abc",
    details: "",
    writerId: 3,
    writerMembername: "최고급 짱구 콧털털이",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
    likeCnt: 0,
    collectionPinCnt: 1,
    scrapCnt: 0,
    tags: [],
    scrapped: false,
    liked: false,
  },
  {
    id: 137,
    title: "a",
    details: "",
    writerId: 3,
    writerMembername: "최고급 짱구 콧털털이",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
    likeCnt: 0,
    collectionPinCnt: 0,
    scrapCnt: 0,
    tags: [],
    scrapped: false,
    liked: false,
  },
  {
    id: 136,
    title: "a",
    details: "",
    writerId: 3,
    writerMembername: "최고급 짱구 콧털털이",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
    likeCnt: 0,
    collectionPinCnt: 0,
    scrapCnt: 0,
    tags: [],
    scrapped: false,
    liked: false,
  },
  {
    id: 135,
    title: "소고기 맛집",
    details: "소고기 맛집컬렉션 ~~~ v",
    writerId: 8,
    writerMembername: "eunji_princess_11",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/collection/THUMBNAIL:135-20240328 05:33:26KST-bc7c7ffc-b604-40ab-99cf-6b765a4a509a.jpeg",
    likeCnt: 3,
    collectionPinCnt: 2,
    scrapCnt: 0,
    tags: ["맛집", "데이트"],
    scrapped: false,
    liked: true,
  },
  {
    id: 134,
    title: "새 컬렉션",
    details: "새롭다@@!",
    writerId: 17,
    writerMembername: "맛있는거 좋아요",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/collection/THUMBNAIL:134-20240327 09:07:44KST-d85a1eab-5200-449a-b55b-32e852f9e835.png",
    likeCnt: 1,
    collectionPinCnt: 20,
    scrapCnt: 0,
    tags: ["디저트"],
    scrapped: false,
    liked: false,
  },
  {
    id: 133,
    title: "야호",
    details: "abcdef",
    writerId: 12,
    writerMembername: "깨끗한 보라빛의 치타타타타랄",
    thumbnail: "https://picsum.photos/id/326/300",
    likeCnt: 1,
    collectionPinCnt: 4,
    scrapCnt: 1,
    tags: ["abc", "sdfsdf"],
    scrapped: true,
    liked: false,
  },
  {
    id: 132,
    title: "라멘맛집쓰",
    details: "",
    writerId: 14,
    writerMembername: "착한 참새",
    thumbnail:
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/collection1.png",
    likeCnt: 1,
    collectionPinCnt: 2,
    scrapCnt: 0,
    tags: ["맛집", "라멘"],
    scrapped: false,
    liked: false,
  },
];
