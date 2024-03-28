import { logout } from "@/hooks/useLogout";

const fetchDeleteCollection = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    console.log("fetchDeleteCollection", res);
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("컬렉션 삭제에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "컬렉션 삭제에 실패했습니다.",
    };
  }
};
export default fetchDeleteCollection;
