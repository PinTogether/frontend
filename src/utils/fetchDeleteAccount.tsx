const fetchDeleteAccount = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`, {
      method: "DELETE",
      credentials: "include",
    });
    console.log("fetchDeleteFollow res", res);
    if (!res.ok) throw new Error("탈퇴에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "탈퇴에 실패했습니다.",
    };
  }
};
export default fetchDeleteAccount;
