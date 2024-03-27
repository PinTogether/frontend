const fetchPostPinsToCollection = async (
  placeIdList: number[],
  collectionId: number
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pins/selected-places`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId: placeIdList,
          collectionId: collectionId,
        }),
      }
    );
    console.log("fetchPostPinsToCollection", res);
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
export default fetchPostPinsToCollection;
