import { NextResponse, NextRequest } from "next/server";

/* 장소에 대한 모든 핀 조회 */
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
      resultCount: 10,
    },
    results: [
      {
        id: 140,
        placeId: 539612,
        collectionId: 123,
        collectionTitle: "dd",
        writerMembername: "최고급 짱구 콧털털이",
        writerId: 1,
        avatarImage: "",
        review: "",
        createdAt: "1일 전",
        imagePaths: [
          "h",
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/pin/REVIEW_IMAGE:140-20240328 07:11:42KST-e053a96b-b31a-4be0-82e3-bc07b4b1cf29.jpeg",
        ],
        tags: ["a", "b"],
      },
      {
        id: 139,
        placeId: 539612,
        collectionId: 138,
        collectionTitle: "abc",
        writerMembername: "최고급 짱구 콧털털이",
        writerId: 1,
        avatarImage: "",
        review: "",
        createdAt: "1일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 108,
        placeId: 539612,
        collectionId: 131,
        collectionTitle: "달려라 지우개",
        writerMembername: "최고급 짱구 콧털털이",
        writerId: 1,
        avatarImage: "",
        review: "",
        createdAt: "2일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 87,
        placeId: 539612,
        collectionId: 95,
        collectionTitle: "pin",
        writerMembername: "깨끗한 보라빛의 치타타타타랄",
        writerId: 1,
        avatarImage:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/member/AVATAR:12-20240322 09:38:59KST-80348dfa-e459-46e3-b64e-44585b84382a.jpeg",
        review: "",
        createdAt: "2일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 86,
        placeId: 539612,
        collectionId: 96,
        collectionTitle: "pin",
        writerMembername: "깨끗한 보라빛의 치타타타타랄",
        writerId: 1,
        avatarImage:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/member/AVATAR:12-20240322 09:38:59KST-80348dfa-e459-46e3-b64e-44585b84382a.jpeg",
        review: "",
        createdAt: "2일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 85,
        placeId: 539612,
        collectionId: 97,
        collectionTitle: "pin",
        writerMembername: "깨끗한 보라빛의 치타타타타랄",
        writerId: 1,
        avatarImage:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/member/AVATAR:12-20240322 09:38:59KST-80348dfa-e459-46e3-b64e-44585b84382a.jpeg",
        review: "",
        createdAt: "2일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 84,
        placeId: 539612,
        collectionId: 126,
        collectionTitle: "이미지를 가진 컬렉션 !?",
        writerMembername: "깨끗한 보라빛의 치타타타타랄",
        writerId: 1,
        avatarImage:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/member/AVATAR:12-20240322 09:38:59KST-80348dfa-e459-46e3-b64e-44585b84382a.jpeg",
        review: "",
        createdAt: "2일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 83,
        placeId: 539612,
        collectionId: 133,
        collectionTitle: "야호",
        writerMembername: "깨끗한 보라빛의 치타타타타랄",
        writerId: 1,
        avatarImage:
          "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/member/AVATAR:12-20240322 09:38:59KST-80348dfa-e459-46e3-b64e-44585b84382a.jpeg",
        review: "",
        createdAt: "2일 전",
        imagePaths: [],
        tags: [],
      },
      {
        id: 39,
        placeId: 539612,
        collectionId: 100,
        collectionTitle: "이게 맛집이제",
        writerMembername: "최고급 짱구 콧털털이",
        writerId: 1,
        avatarImage: "",
        review: "",
        createdAt: "3/25",
        imagePaths: [],
        tags: [],
      },
      {
        id: 38,
        placeId: 539612,
        collectionId: 101,
        collectionTitle: "디저트",
        writerMembername: "최고급 짱구 콧털털이",
        writerId: 1,
        avatarImage: "",
        review: "",
        createdAt: "3/25",
        imagePaths: [],
        tags: [],
      },
    ],
  });
}
