import { CollectionDetail } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";

const fetchGetCollectionInfo = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetCollectionInfo res", res);
    if (!res.ok) throw new Error("컬렉션 정보 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetCollectionInfo data", data);
    const collectionInfo: CollectionDetail = data.results[0];
    return { collectionInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionInfo: null,
      errorMessage: "컬렉션 정보 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionInfo;
