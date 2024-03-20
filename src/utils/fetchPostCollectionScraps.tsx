const fetchPostCollectionScraps = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/scraps`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("fetchPostCollectionScraps", res);
    if (!res.ok) throw new Error("컬렉션 스크랩에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "컬렉션 스크랩에 실패했습니다.",
    };
  }
};
export default fetchPostCollectionScraps;
