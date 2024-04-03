import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

enum SearchType {
  TOTAL = "TOTAL",
  PLACE = "PLACE",
  COLLECTION = "COLLECTION",
  PIN = "PIN",
}

interface SearchLog {
  id: number;
  query: string;
} // query => keyword

const fetchGetSearchHistory = async (): Promise<{
  searchLogs: SearchLog[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/history?type=${SearchType.TOTAL}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetSearchHistory res", res);
    if (res.status === 401) {
      logout();
      return {
        searchLogs: [],
        errorMessage: "검색 기록은 로그인이 필요합니다.", // local storage
      };
    }
    if (!res.ok) throw new Error("검색 기록 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetSearchHistory data", data);
    if (data.metadata.resultCount == 0) {
      return {
        searchLogs: [],
        errorMessage: "검색 기록이 없습니다.",
      };
    }
    return { searchLogs: data.results, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      searchLogs: [],
      errorMessage: "검색 기록 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetSearchHistory;
