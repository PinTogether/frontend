import { CollectionForAddPin } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";

const fetchGetCollectionForAddPin = async (
  placeId: number
): Promise<{
  collectionDatas: CollectionForAddPin[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/collections?placeId=${placeId}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetCollectionForAddPin res", res);
    if (!res.ok) throw new Error("컬렉션 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetCollectionForAddPin data", data);
    if (data.metadata.resultCount === 0) {
      return {
        collectionDatas: [],
        errorMessage: "컬렉션을 먼저 만들어주세요! 📝",
      };
    }
    const collectionDatas: CollectionForAddPin[] = data.results;
    return { collectionDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionDatas: [],
      errorMessage: "컬렉션 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionForAddPin;
