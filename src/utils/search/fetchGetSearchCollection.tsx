import APIResponse from "@/types/APIResponse";
import { CollectionDetail } from "@/types/Collection";
import { logout } from "@/hooks/useLogout";

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
    if (res.status === 401) {
      logout();
      return {
        collectionDatas: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("검색에 실패했습니다.");
    const data: APIResponse = await res.json();
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
