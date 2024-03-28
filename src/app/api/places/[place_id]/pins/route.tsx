import { NextResponse, NextRequest } from "next/server";

import dummydata from "./dummydata.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { place_id: string } }
) {
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log("GET /api/places/[place_id]/pins/route.tsx");
  console.log("params", params);
  console.log("page, size", page, size);

  if (page === "1") {
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
        id: 2,
        collectionId: 45,
        collectionTitle: "고깃집 컬렉션222",
        writer: "단호한 푸른 다람쥐",
        avatarImage: "",
        review:
          "따듯한 감성을 느낄 수 있는 모락모락 피어나는 연기가 있는 고기집입니다22222222222",
        createdAt: "2024-03-20T18:20:50.454269",
        imagePaths: [
          "https://picsum.photos/200",
          "https://picsum.photos/200",
          "https://picsum.photos/200",
        ],
        tags: ["맛222집", "아잉 맛2222있다", "후와아아아2222"],
      },
      {
        id: 1,
        collectionId: 15,
        collectionTitle: "고깃집 컬렉션",
        writer: "고귀한 고양이",
        avatarImage: "",
        review:
          "따듯한 감성을 느낄 수 있는 모락모락 피어나는 연기가 있는 고기집입니다",
        createdAt: "2024-03-14T14:41:26.554283",
        imagePaths: ["https://picsum.photos/200", "https://picsum.photos/200"],
        tags: ["맛집", "아잉 맛있다", "후와아아아"],
      },
    ],
  });
}
