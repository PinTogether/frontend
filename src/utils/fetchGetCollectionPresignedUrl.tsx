import APIResponse from "@/types/APIResponse";
import PresignedUrl from "@/types/PresingedUrl";

// TODO : POST
const fetchGetCollectionPresignedUrl = async (
  collectionId: number,
  contentType: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/thumbnail/presigned-url`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: contentType }),
      }
    );
    console.log("fetchGetCollectionPresignedUrl res", res);
    if (!res.ok) throw new Error("presinged url 발급에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetCollectionPresignedUrl data", data);
    const presignedUrlData: PresignedUrl = data.results[0];
    return { presignedUrlData, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      presignedUrlData: null,
      errorMessage: "presinged url 발급에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionPresignedUrl;
