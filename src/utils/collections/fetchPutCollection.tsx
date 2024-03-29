import PresignedUrl from "@/types/PresingedUrl";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchPutCollection = async (
  collectionId: number,
  title: string,
  thumbnail: string,
  details: string,
  tags: string[]
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          thumbnail: thumbnail,
          details: details,
          tags: tags,
        }),
      }
    );
    console.log("fetchPutCollection res", res);
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("컬렉션 수정을 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "컬렉션 수정을 실패했습니다.",
    };
  }
};
export default fetchPutCollection;
