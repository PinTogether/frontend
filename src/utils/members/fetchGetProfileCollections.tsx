import { CollectionDetail } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${userId}/collections?page=${page}&size=${size}`,
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
    if (!res.ok) throw new Error("유저의 컬렉션 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    if (data.metadata.resultCount === 0) {
      return {
        collectionDatas: [],
        errorMessage: "컬렉션이 없습니다.",
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
