import { NextResponse, NextRequest } from "next/server";

/* 멤버 네임 중복 검사 */
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  console.log("GET /api/members//profile-setting/membername-valid?membername=");
  console.log("params", params);

  const valid = true;
  return NextResponse.json({
    status: {
      code: 200,
      message: "OK",
    },
    metadata: {
      resultCount: 1,
    },
    results: [
      {
        valid: valid,
      },
    ],
  });
}
