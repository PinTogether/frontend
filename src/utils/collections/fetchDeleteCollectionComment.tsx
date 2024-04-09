import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchDeleteCollectionComment = async (
  commentId: number
): Promise<{
  success: boolean;
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/comments/${commentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("댓글 삭제에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "댓글 삭제에 실패했습니다.",
    };
  }
};
export default fetchDeleteCollectionComment;
