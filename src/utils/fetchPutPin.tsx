import APIResponse from "@/types/APIResponse";

const fetchPutPin = async (
  pinId: number,
  review: string,
  imagePaths: string[],
  tags: string[]
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pins/${pinId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: review,
          imagePaths: imagePaths,
          tags: tags,
        }),
      }
    );
    console.log("fetchPutPin res", res);
    if (!res.ok) throw new Error("핀 수정에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "핀 수정에 실패했습니다.",
    };
  }
};
export default fetchPutPin;
