const fetchPostFollow = async (followUserId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${followUserId}/follow`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("fetchPostFollow", res);
    if (!res.ok) throw new Error("팔로우에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "팔로우에 실패했습니다.",
    };
  }
};
export default fetchPostFollow;
