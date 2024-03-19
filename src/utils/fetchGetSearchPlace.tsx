import APIResponse from "@/types/APIResponse";
import { PlaceDetail } from "@/types/Place";

const fetchGetSearchPlace = async (
  searchKeyword: string,
  page: number = 0,
  size: number = 10
): Promise<{
  collectionDatas: PlaceDetail[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/place?query=${searchKeyword}&page=${page}&size=${size}`,
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${userId}/scraps?page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetSearchPlace res", res);
    if (!res.ok) throw new Error("검색에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetSearchPlace data", data);
    if (data.metadata.resultCount == 0) {
      return {
        collectionDatas: [],
        errorMessage: "검색 키워드에 맞는 장소가 없습니다.",
      };
    }
    const collectionDatas: PlaceDetail[] = data.results;
    return { collectionDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionDatas: [],
      errorMessage: "검색에 실패했습니다.",
    };
  }
};
export default fetchGetSearchPlace;
