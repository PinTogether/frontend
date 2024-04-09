import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchPostCollectionComments = async (
  collectionId: number,
  contents: string
): Promise<{
  success: boolean;
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/comments`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: contents }),
      }
    );
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("댓글 등록에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "댓글 등록에 실패했습니다.",
    };
  }
};
export default fetchPostCollectionComments;
