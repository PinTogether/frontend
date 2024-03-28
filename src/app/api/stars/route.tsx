import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET /api/stars/route.tsx");
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
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 12,
    },
    results: [
      {
        id: 579734,
        name: "연남동구슬아이스크림",
        roadNameAddress: "서울특별시 마포구 연희로1길 28, 지층 B101호 (동교동)",
        pinCnt: 2,
        latitude: 37.5602054742544,
        longitude: 126.92556176396533,
        category: "음식점>기타",
        starred: true,
      },
      {
        id: 564227,
        name: "요거트아이스크림의정석",
        roadNameAddress: "서울특별시 강북구 솔매로44길 11, 1층 (미아동)",
        pinCnt: 1,
        latitude: 37.62529304627687,
        longitude: 127.02470009443435,
        category: "음식점>기타",
        starred: true,
      },
      {
        id: 580229,
        name: "홍대구슬아이스크림",
        roadNameAddress:
          "서울특별시 마포구 와우산로27길 26, 지1층 일부호 (서교동)",
        pinCnt: 1,
        latitude: 37.5544297340095,
        longitude: 126.92704835949235,
        category: "음식점>기타",
        starred: true,
      },
      {
        id: 568935,
        name: "모스버거&빨라쪼 아이스크림",
        roadNameAddress:
          "서울특별시 노원구 노해로81길 16, 화랑상가 1층 8~11호 (상계동)",
        pinCnt: 1,
        latitude: 37.655663547998586,
        longitude: 127.06287680341362,
        category: "음식점>패밀리레스트랑",
        starred: true,
      },
      {
        id: 581583,
        name: "깡치네&아이스크림스토리 망원점",
        roadNameAddress: "서울특별시 마포구 방울내로 1, 지상1층 1호 (망원동)",
        pinCnt: 1,
        latitude: 37.55624626293739,
        longitude: 126.89852300601942,
        category: "음식점>한식",
        starred: true,
      },
      {
        id: 570254,
        name: "하우돈곱창, 우주요거트&아이스크림 공릉점",
        roadNameAddress: "서울특별시 노원구 공릉로34길 20, 1층 (공릉동)",
        pinCnt: 1,
        latitude: 37.622648390180146,
        longitude: 127.08026436526315,
        category: "음식점>한식",
        starred: true,
      },
      {
        id: 538102,
        name: "아이스크림 소사이어티",
        roadNameAddress:
          "서울특별시 용산구 한남대로20길 47, 1층 101호 (한남동)",
        pinCnt: 1,
        latitude: 37.53491931771981,
        longitude: 127.00950320301897,
        category: "음식점>기타",
        starred: true,
      },
      {
        id: 584825,
        name: "신스(Shins) 홍대카페&아이스크림",
        roadNameAddress:
          "서울특별시 마포구 와우산로21길 21-14 (서교동, 지하1층)",
        pinCnt: 1,
        latitude: 37.55179882288559,
        longitude: 126.92208346849903,
        category: "음식점>까페",
        starred: true,
      },
      {
        id: 571772,
        name: "요거트아이스크림의 정석",
        roadNameAddress: "서울특별시 노원구 공릉로58길 88, 지상1층 (하계동)",
        pinCnt: 1,
        latitude: 37.635479977213144,
        longitude: 127.07324687655232,
        category: "음식점>기타",
        starred: true,
      },
      {
        id: 549114,
        name: "벤앤제리스아이스크림",
        roadNameAddress:
          "서울특별시 광진구 광나루로39길 11, 1층 139-2호 (구의동, 구의자이르네)",
        pinCnt: 1,
        latitude: 37.54549945224017,
        longitude: 127.0887779738141,
        category: "음식점>호프/통닭",
        starred: true,
      },
      {
        id: 562168,
        name: "아임요거트&아이스크림-성신여대점",
        roadNameAddress:
          "서울특별시 성북구 보문로31길 36, 1층(우측) (삼선동5가)",
        pinCnt: 1,
        latitude: 37.588147802441256,
        longitude: 127.01479184874027,
        category: "음식점>기타",
        starred: true,
      },
      {
        id: 570614,
        name: "디저트짱",
        roadNameAddress:
          "서울특별시 노원구 노원로16길 15, 상가동 201호 (하계동, 중계9단지)",
        pinCnt: 2,
        latitude: 37.64279753226295,
        longitude: 127.0743506857847,
        category: "음식점>분식",
        starred: true,
      },
    ],
  });
}
