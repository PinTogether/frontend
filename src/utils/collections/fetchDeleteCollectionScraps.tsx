import { logout } from "@/hooks/useLogout";

const fetchDeleteCollectionScraps = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/scraps`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    console.log("fetchDeleteCollectionScraps", res);
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("컬렉션 스크랩 취소에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "컬렉션 스크랩 취소에 실패했습니다.",
    };
  }
};
export default fetchDeleteCollectionScraps;
