import { NextResponse, NextRequest } from "next/server";
import { PlaceDetail } from "@/types/Place";

/* 장소 검색 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  console.log(
    "GET /api//search/place?query=${searchKeyword}&page=${page}&size=${size}"
  );
  console.log("params", params);
  console.log("query, page, size", query, page, size);
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

const dummydata = [
  {
    id: 525482,
    name: "고기하다",
    roadNameAddress: "서울특별시 종로구 대학로 133-6, 1층 (명륜4가)",
    placePinCnt: 0,
    latitude: 200032.0776,
    longitude: 453403.9145,
  },
  {
    id: 525679,
    name: "레인트리커피앤디저트(RainTreecoffee&dessert)",
    roadNameAddress: "서울특별시 종로구 대명길 18, 1층 (명륜2가)",
    placePinCnt: 0,
    latitude: 199973.8997,
    longitude: 453466.2673,
  },
  {
    id: 526438,
    name: "효자동 목고기",
    roadNameAddress: "서울특별시 종로구 종로16길 24, 1,2층 (관철동)",
    placePinCnt: 0,
    latitude: 198922.6894,
    longitude: 451854.0417,
  },
  {
    id: 526945,
    name: "익선동 고기집",
    roadNameAddress: "서울특별시 종로구 수표로28길 47, 1층 (익선동)",
    placePinCnt: 0,
    latitude: 199120.5623,
    longitude: 452342.3471,
  },
  {
    id: 527063,
    name: "엉터리생고기 대학로점",
    roadNameAddress: "서울특별시 종로구 대명길 22 (명륜2가,(지상3층))",
    placePinCnt: 0,
    latitude: 199965.5525,
    longitude: 453459.1068,
  },
  {
    id: 527201,
    name: "고기와 찌개마을",
    roadNameAddress: "서울특별시 종로구 종로51길 15, 1층 (창신동)",
    placePinCnt: 0,
    latitude: 200971.7589,
    longitude: 452264.0219,
  },
  {
    id: 527297,
    name: "창신생고기",
    roadNameAddress: "서울특별시 종로구 지봉로7길 16 (창신동)",
    placePinCnt: 0,
    latitude: 201274.8899,
    longitude: 452535.0403,
  },
  {
    id: 527335,
    name: "때때로 고기",
    roadNameAddress: "서울특별시 종로구 종로16길 22, 1층 (관철동)",
    placePinCnt: 0,
    latitude: 198922.06,
    longitude: 451864.1772,
  },
  {
    id: 527356,
    name: "광화문고기집",
    roadNameAddress: "서울특별시 종로구 새문안로5가길 11, 1층 (내수동)",
    placePinCnt: 0,
    latitude: 197618.4597,
    longitude: 452311.2852,
  },
  {
    id: 527383,
    name: "고기공방",
    roadNameAddress: "서울특별시 종로구 대명1길 16-17, 지상1층 (명륜4가)",
    placePinCnt: 0,
    latitude: 199926.8282,
    longitude: 453390.2333,
  },
];

// TODO 타입 안맞음 확인하기
// const results: PlaceDetail[] = [
//   {
//     id: 525482,
//     name: "고기하다",
//     roadNameAddress: "서울특별시 종로구 대학로 133-6, 1층 (명륜4가)",
//     placePinCnt: 0,
//     latitude: 200032.0776,
//     longitude: 453403.9145,
//   },
//   {
//     id: 525679,
//     name: "레인트리커피앤디저트(RainTreecoffee&dessert)",
//     roadNameAddress: "서울특별시 종로구 대명길 18, 1층 (명륜2가)",
//     placePinCnt: 0,
//     latitude: 199973.8997,
//     longitude: 453466.2673,
//   },
//   {
//     id: 526438,
//     name: "효자동 목고기",
//     roadNameAddress: "서울특별시 종로구 종로16길 24, 1,2층 (관철동)",
//     placePinCnt: 0,
//     latitude: 198922.6894,
//     longitude: 451854.0417,
//   },
//   {
//     id: 526945,
//     name: "익선동 고기집",
//     roadNameAddress: "서울특별시 종로구 수표로28길 47, 1층 (익선동)",
//     placePinCnt: 0,
//     latitude: 199120.5623,
//     longitude: 452342.3471,
//   },
//   {
//     id: 527063,
//     name: "엉터리생고기 대학로점",
//     roadNameAddress: "서울특별시 종로구 대명길 22 (명륜2가,(지상3층))",
//     placePinCnt: 0,
//     latitude: 199965.5525,
//     longitude: 453459.1068,
//   },
//   {
//     id: 527201,
//     name: "고기와 찌개마을",
//     roadNameAddress: "서울특별시 종로구 종로51길 15, 1층 (창신동)",
//     placePinCnt: 0,
//     latitude: 200971.7589,
//     longitude: 452264.0219,
//   },
//   {
//     id: 527297,
//     name: "창신생고기",
//     roadNameAddress: "서울특별시 종로구 지봉로7길 16 (창신동)",
//     placePinCnt: 0,
//     latitude: 201274.8899,
//     longitude: 452535.0403,
//   },
//   {
//     id: 527335,
//     name: "때때로 고기",
//     roadNameAddress: "서울특별시 종로구 종로16길 22, 1층 (관철동)",
//     placePinCnt: 0,
//     latitude: 198922.06,
//     longitude: 451864.1772,
//   },
//   {
//     id: 527356,
//     name: "광화문고기집",
//     roadNameAddress: "서울특별시 종로구 새문안로5가길 11, 1층 (내수동)",
//     placePinCnt: 0,
//     latitude: 197618.4597,
//     longitude: 452311.2852,
//   },
//   {
//     id: 527383,
//     name: "고기공방",
//     roadNameAddress: "서울특별시 종로구 대명1길 16-17, 지상1층 (명륜4가)",
//     placePinCnt: 0,
//     latitude: 199926.8282,
//     longitude: 453390.2333,
//   },
// ];
