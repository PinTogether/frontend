const fetchPostCollectionLikes = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/likes`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("fetchPostCollectionLikes", res);
    if (!res.ok) throw new Error("좋아요에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "좋아요에 실패했습니다.",
    };
  }
};
export default fetchPostCollectionLikes;
