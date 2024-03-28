import { CollectionDetail } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetProfileScraps = async (
  userId: number,
  page: number = 0,
  size: number = 10
): Promise<{
  scrapDatas: CollectionDetail[];
  errorMessage: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${userId}/scraps?page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetProfileScraps res", res);
    if (res.status === 401) {
      logout();
      return {
        scrapDatas: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("스크랩한 컬렉션 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetProfileScraps data", data);
    if (data.metadata.resultCount === 0) {
      return {
        scrapDatas: [],
        errorMessage: "스크랩한 컬렉션이 없습니다.",
      };
    }
    const scrapDatas: CollectionDetail[] = data.results;
    return { scrapDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      scrapDatas: [],
      errorMessage: "스크랩한 컬렉션 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetProfileScraps;
