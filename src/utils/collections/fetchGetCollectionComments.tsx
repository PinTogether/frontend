import CollectionReply from "@/types/CollectionReply";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetCollectionComments = async (
  collectionId: number
): Promise<{
  replyList: CollectionReply[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/comments`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return {
        replyList: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("컬렉션 댓글 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    if (data.metadata.resultCount === 0) {
      return {
        replyList: [],
        errorMessage: "첫 댓글을 달아주세요! 📝",
      };
    }
    const replyDatas: CollectionReply[] = data.results;
    return { replyList: replyDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      replyList: [],
      errorMessage: "컬렉션 댓글 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionComments;
