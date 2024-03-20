import CollectionReply from "@/types/CollectionReply";
import APIResponse from "@/types/APIResponse";

const fetchGetCollectionComments = async (
  collectionId: number
): Promise<{
  replyDatas: CollectionReply[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/comments`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetCollectionComments res", res);
    if (!res.ok) throw new Error("컬렉션 댓글 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetCollectionComments data", data);
    if (data.metadata.resultCount === 0) {
      return {
        replyDatas: [],
        errorMessage: "첫 댓글을 달아주세요! 📝",
      };
    }
    const replyDatas: CollectionReply[] = data.results;
    return { replyDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      replyDatas: [],
      errorMessage: "컬렉션 댓글 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionComments;
