import APIResponse from "@/types/APIResponse";

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
    console.log("fetchDeleteCollectionComment res", res);
    if (!res.ok) throw new Error("댓글 삭제에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchDeleteCollectionComment data", data);
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
