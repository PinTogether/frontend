const fetchDeleteStarPlace = async (placeId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stars/${placeId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    console.log("fetchDeleteStarPlace", res);
    if (res.status === 403) {
      return {
        success: false,
        errorMessage: "로그인이 필요합니다.",
      };
    } else if (res.status === 400 || res.status === 404) {
      return {
        success: false,
        errorMessage: res.statusText,
      };
    }
    if (!res.ok) throw new Error("장소 찜 취소하기 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "장소 찜 취소하기 실패했습니다.",
    };
  }
};
export default fetchDeleteStarPlace;
