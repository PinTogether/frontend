const fetchDeleteFollow = async (userId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${userId}/follow`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    console.log("fetchDeleteFollow", res);
    if (!res.ok) throw new Error("팔로우 취소에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "팔로우 취소에 실패했습니다.",
    };
  }
};
export default fetchDeleteFollow;
