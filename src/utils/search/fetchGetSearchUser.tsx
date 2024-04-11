import APIResponse from "@/types/APIResponse";
// import { CollectionDetail } from "@/types/Collection";
import { ProfileFollower } from "@/types/Profile";
import { logout } from "@/hooks/useLogout";

const fetchGetSearchUser = async (
  searchKeyword: string,
  page: number = 0,
  size: number = 10
): Promise<{
  userDatas: ProfileFollower[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/members?query=${searchKeyword}&page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return {
        userDatas: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("유저 검색에 실패했습니다.");
    const data: APIResponse = await res.json();
    if (data.metadata.resultCount == 0) {
      return {
        userDatas: [],
        errorMessage: "검색 키워드에 맞는 유저가 없습니다.",
      };
    }
    const userDatas: ProfileFollower[] = data.results;
    return { userDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      userDatas: [],
      errorMessage: "유저 검색에 실패했습니다.",
    };
  }
};
export default fetchGetSearchUser;
