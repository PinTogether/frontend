const fetchDeleteFollow = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
      method: "DELETE",
      credentials: "include",
    });
    console.log("fetchDeleteFollow", res);
    if (!res.ok) throw new Error("계정 삭제에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "계정 삭제에 실패했습니다.",
    };
  }
};
export default fetchDeleteFollow;
