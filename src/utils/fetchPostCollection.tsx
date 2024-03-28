import PresignedUrl from "@/types/PresingedUrl";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";
// TODO

const fetchPostCollection = async (
  title: string,
  details: string,
  tags: string[],
  contentType: string | null
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          details: details,
          tags: tags,
          contentType: contentType,
        }),
      }
    );
    console.log("fetchPostCollection res", res);
    if (res.status === 401) {
      logout();
      return {
        presingedUrlData: null,
        newCollectionId: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("컬렉션 생성을 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchPostCollection data", data);
    if (contentType) {
      const presingedUrlData: PresignedUrl = data.results[0];
      return {
        presingedUrlData: presingedUrlData,
        newCollectionId: presingedUrlData.id,
        errorMessage: "",
      };
    } else {
      const result: {
        id: number;
      } = data.results[0];
      return {
        presingedUrlData: null,
        newCollectionId: result.id,
        errorMessage: "",
      };
    }
  } catch (err: any) {
    console.error(err);
    return {
      presingedUrlData: null,
      newCollectionId: null,
      errorMessage: "컬렉션 생성을 실패했습니다.",
    };
  }
};
export default fetchPostCollection;
