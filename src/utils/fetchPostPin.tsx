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
    });
    console.log("fetchPostPin", res);
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
