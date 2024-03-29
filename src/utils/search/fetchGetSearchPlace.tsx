import APIResponse from "@/types/APIResponse";
import { PlaceDetail } from "@/types/Place";
import { logout } from "@/hooks/useLogout";

const fetchGetSearchPlace = async (
  searchKeyword: string,
  page: number = 0,
  size: number = 10
): Promise<{
  placeDatas: PlaceDetail[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/places?query=${searchKeyword}&page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetSearchPlace res", res);
    if (res.status === 401) {
      logout();
      return {
        placeDatas: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("검색에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetSearchPlace data", data);
    if (data.metadata.resultCount == 0) {
      return {
        placeDatas: [],
        errorMessage: "검색 키워드에 맞는 장소가 없습니다.",
      };
    }
    const placeDatas: PlaceDetail[] = data.results;
    return { placeDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      placeDatas: [],
      errorMessage: "검색에 실패했습니다.",
    };
  }
};
export default fetchGetSearchPlace;
