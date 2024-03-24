import APIResponse from "@/types/APIResponse";
import { CollectionDetail } from "@/types/Collection";

const fetchGetSearchCollection = async (
  searchKeyword: string,
  page: number = 0,
  size: number = 10
): Promise<{
  collectionDatas: CollectionDetail[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/collections?query=${searchKeyword}&page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetSearchCollection res", res);
    if (!res.ok) throw new Error("검색에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetSearchCollection data", data);
    if (data.metadata.resultCount == 0) {
      return {
        collectionDatas: [],
        errorMessage: "검색 키워드에 맞는 컬렉션이 없습니다.",
      };
    }
    const collectionDatas: CollectionDetail[] = data.results;
    return { collectionDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionDatas: [],
      errorMessage: "검색에 실패했습니다.",
    };
  }
};
export default fetchGetSearchCollection;
