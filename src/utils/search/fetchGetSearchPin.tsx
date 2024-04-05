import APIResponse from "@/types/APIResponse";
import Pin from "@/types/Pin";
import { logout } from "@/hooks/useLogout";
import { SearchRangeFilter } from "@/types/SearchRangeFilter";

const fetchGetSearchPin = async (
  searchKeyword: string,
  page: number = 0,
  size: number = 10,
  filter?: SearchRangeFilter | null
): Promise<{
  pinDatas: Pin[];
  errorMessage: string;
}> => {
  const reqeustUrl = filter
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/pins?query=${searchKeyword}&page=${page}&size=${size}&filter=${filter.leftBottomLatitude},${filter.leftBottomLongitude},${filter.rightTopLatitude},${filter.rightTopLongitude}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/pins?query=${searchKeyword}&page=${page}&size=${size}`;
  try {
    const res = await fetch(reqeustUrl, {
      credentials: "include",
    });
    console.log("fetchGetSearchPin res", res);
    if (res.status === 401) {
      logout();
      return {
        pinDatas: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("검색에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetSearchPin data", data);
    if (data.metadata.resultCount == 0) {
      return {
        pinDatas: [],
        errorMessage: "검색 키워드에 맞는 핀가 없습니다.",
      };
    }
    const pinDatas: Pin[] = data.results;
    return { pinDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      pinDatas: [],
      errorMessage: "검색에 실패했습니다.",
    };
  }
};
export default fetchGetSearchPin;
