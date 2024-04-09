import { CollectionDetail } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetTopCollection = async (ids: number[]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/top?cnt=10&ids=${ids}`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return {
        collectionData: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("Top10 컬렉션 정보 가져오기를 실패했습니다.");
    const data: APIResponse = await res.json();
    const collectionData: CollectionDetail[] = data.results;
    if (collectionData.length === 0) {
      return {
        collectionData: null,
        errorMessage: "추천 컬렉션이 없습니다.",
      };
    }
    return { collectionData, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionData: null,
      errorMessage: "Top10 컬렉션 정보 가져오기를 실패했습니다.",
    };
  }
};
export default fetchGetTopCollection;
