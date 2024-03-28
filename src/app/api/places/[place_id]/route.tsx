import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { place_id: string } }
) {
  console.log("GET /api/places/[place_id]/route.tsx");
  console.log("params", params);
  // return NextResponse.json(
  //   {
  //     status: {
  //       code: 404,
  //       message: "Not Found",
  //     },
  //     metadata: {
  //       resultCount: 0,
  //     },
  //     results: [],
  //   },
  //   {
  //     status: 404,
  //   }
  // );
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 0,
    },
    results: [
      {
        id: 123,
        latitude: 37.5665,
        longitude: 126.978,
        name: "Queenstown",
        roadNameAddress: "123 Queen Street, Queenstown, New Zealand",
        phoneNumber: "+123-456-7890",
        category: "HEALTH",
        starred: true,
      },
    ],
  });
}
