import { CollectionDetail } from "@/types/Collection";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetCollectionInfo = async (collectionId: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}`, {
      credentials: "include",
      cache: "no-store",
    });
    if (res.status === 401) {
      logout();
      return {
        collectionInfo: null,
        errorMessage: "로그인이 필요합니다.",
      };
    } else if (res.status === 404) {
      return {
        collectionInfo: null,
        errorMessage: "컬렉션 정보를 찾을 수 없습니다.",
      };
    }
    if (!res.ok) throw new Error("컬렉션 정보 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    const collectionInfo: CollectionDetail = data.results[0];
    return { collectionInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      collectionInfo: null,
      errorMessage: "컬렉션 정보 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionInfo;
