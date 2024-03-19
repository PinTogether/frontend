import { CollectionDetail } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";

const fetchGetProfileCollections = async (
  userId: number,
  page: number = 0,
  size: number = 10
): Promise<{
  collectionDatas: CollectionDetail[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${userId}/scraps?page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetProfileCollections res", res);
    if (!res.ok) throw new Error("유저의 컬렉션 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetProfileCollections data", data);
    if (data.metadata.resultCount === 0) {
      return {
        collectionDatas: [],
        errorMessage: "검색 결과가 없습니다.",
      };
    }
    const collectionDatas: CollectionDetail[] = data.results;
    return { collectionDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionDatas: [],
      errorMessage: "유저의 컬렉션 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetProfileCollections;
