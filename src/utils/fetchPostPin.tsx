const fetchPostPin = async (
  placeId: number,
  collectionId: number,
  review: string,
  tags: string[],
  fileType: string[] // mineType ex) image/jpeg
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pins`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        placeId: placeId,
        collectionId: collectionId,
        review: review,
        tags: tags,
        fileType: fileType,
      }),
    });
    console.log("fetchPostPin", res);
    if (res.status === 403) {
      return {
        success: false,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("핀 등록에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "핀 등록에 실패했습니다.",
    };
  }
};
export default fetchPostPin;
