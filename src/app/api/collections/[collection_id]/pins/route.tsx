import { NextResponse, NextRequest } from "next/server";

import dummydata2 from "./dummydata2.json";

/* 특정 콜렉션의 모든 핀 조회 */
export async function GET(
  request: NextRequest,
  { params }: { params: { collection_id: string } }
) {
  console.log("GET /api/collections/[collection_id]/pins/route.tsx");
  console.log("params", params);
  if (params.collection_id == "1") {
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
  } else if (params.collection_id == "2") {
    return NextResponse.json({
      status: {
        code: 200,
        message: "OK",
      },
      metadata: {
        resultCount: 1,
      },
      results: dummydata2,
    });
  }
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 9,
    },
    results: [
      {
        id: 37,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/24",
        placeId: 539612,
        placeName: "디저트39",
        category: "음식점>기타",
        address: "서울특별시 용산구 한강대로 305, 지하1층 (갈월동)",
        latitude: 37.54554952024324,
        longitude: 126.97158543222845,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 38,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 539612,
        placeName: "디저트39",
        category: "음식점>기타",
        address: "서울특별시 용산구 한강대로 305, 지하1층 (갈월동)",
        latitude: 37.54554952024324,
        longitude: 126.97158543222845,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 40,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "핌핀핀",
        tags: ["맛나요"],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 569293,
        placeName: "디저트카페 봄",
        category: "음식점>기타",
        address: "서울특별시 노원구 동일로227길 47, 1층 102호 (상계동)",
        latitude: 37.66698197014826,
        longitude: 127.05429758250715,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 41,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "핌핀핀",
        tags: ["맛나요"],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 569293,
        placeName: "디저트카페 봄",
        category: "음식점>기타",
        address: "서울특별시 노원구 동일로227길 47, 1층 102호 (상계동)",
        latitude: 37.66698197014826,
        longitude: 127.05429758250715,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 42,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "핌핀핀",
        tags: ["맛나요"],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 569293,
        placeName: "디저트카페 봄",
        category: "음식점>기타",
        address: "서울특별시 노원구 동일로227길 47, 1층 102호 (상계동)",
        latitude: 37.66698197014826,
        longitude: 127.05429758250715,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 43,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "핌핀핀",
        tags: ["맛나요"],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 569293,
        placeName: "디저트카페 봄",
        category: "음식점>기타",
        address: "서울특별시 노원구 동일로227길 47, 1층 102호 (상계동)",
        latitude: 37.66698197014826,
        longitude: 127.05429758250715,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 44,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "핌핀핀",
        tags: ["맛나요"],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 569293,
        placeName: "디저트카페 봄",
        category: "음식점>기타",
        address: "서울특별시 노원구 동일로227길 47, 1층 102호 (상계동)",
        latitude: 37.66698197014826,
        longitude: 127.05429758250715,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 45,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "핌핀핀",
        tags: ["맛나요"],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 569293,
        placeName: "디저트카페 봄",
        category: "음식점>기타",
        address: "서울특별시 노원구 동일로227길 47, 1층 102호 (상계동)",
        latitude: 37.66698197014826,
        longitude: 127.05429758250715,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 426,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 599285,
        placeName: "디저트샵 시소",
        category: "음식점>기타",
        address:
          "서울특별시 구로구 천왕로 29, 상가동 1층 101호 (천왕동, 천왕 이펜하우스 4단지)",
        latitude: 37.480358737282195,
        longitude: 126.83819654189753,
        saveCnt: 0,
        starred: false,
      },
      {
        id: 446,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 599285,
        placeName: "디저트샵 시소",
        category: "음식점>기타",
        address:
          "서울특별시 구로구 천왕로 29, 상가동 1층 101호 (천왕동, 천왕 이펜하우스 4단지)",
        latitude: 37.4823587,
        longitude: 126.8381965,
        saveCnt: 104,
        starred: false,
      },
      {
        id: 146,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 599285,
        placeName: "디저트샵 시소",
        category: "음식점>기타",
        address:
          "서울특별시 구로구 천왕로 29, 상가동 1층 101호 (천왕동, 천왕 이펜하우스 4단지)",
        latitude: 37.4803587,
        longitude: 126.8371965,
        saveCnt: 12,
        starred: false,
      },
      {
        id: 147,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 599285,
        placeName: "디저트샵 시소",
        category: "음식점>기타",
        address:
          "서울특별시 구로구 천왕로 29, 상가동 1층 101호 (천왕동, 천왕 이펜하우스 4단지)",
        latitude: 37.4803587,
        longitude: 126.84271965,
        saveCnt: 12,
        starred: false,
      },
      {
        id: 148,
        collectionId: 101,
        collectionTitle: "디저트",
        writerId: 3,
        writerMembername: "최고급 짱구 콧털털이",
        avatarImage: "",
        review: "",
        tags: [],
        imagePaths: [],
        createdAt: "3/25",
        placeId: 599285,
        placeName: "디저트샵 시소",
        category: "음식점>기타",
        address:
          "서울특별시 구로구 천왕로 29, 상가동 1층 101호 (천왕동, 천왕 이펜하우스 4단지)",
        latitude: 37.4803587,
        longitude: 126.84271965,
        saveCnt: 12,
        starred: false,
      },
    ],
  });
}
