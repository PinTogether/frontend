const fetchDeleteCollectionLikes = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${collectionId}/likes`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("fetchDeleteCollectionLikes", res);
    if (!res.ok) throw new Error("좋아요 취소에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "좋아요 취소에 실패했습니다.",
    };
  }
};
export default fetchDeleteCollectionLikes;
