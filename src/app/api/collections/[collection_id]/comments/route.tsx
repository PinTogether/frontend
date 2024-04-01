import { NextResponse, NextRequest } from "next/server";

/* 특정 콜렉션의 모든 댓글 조회 */
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
        resultCount: 2,
      },
      results: [
        {
          id: 3,
          writerId: 8,
          writerName: "은지공주",
          writerMembername: "eunji_princess_11",
          writerAvatar: "",
          contents: "good!",
          createdAt: "3/15",
        },
        {
          id: 4,
          writerId: 1,
          writerName: "은지공주",
          writerMembername: "eunji_princess_11",
          writerAvatar: "",
          contents: "bad bad so bad",
          createdAt: "3/15",
        },
      ],
    });
  }
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
