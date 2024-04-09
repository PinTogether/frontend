import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchPostPin = async (
  placeId: number,
  collectionId: number,
  review: string,
  tags: string[],
  fileType: string[] // mineType ex) image/jpeg
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pins`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        placeId: placeId,
        collectionId: collectionId,
        review: review,
        tags: tags,
        fileType: fileType,
      }),
    });
    if (res.status === 401) {
      logout();
      return {
        success: false,
        newPinId: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (res.status === 403) {
      return {
        success: false,
        newPinId: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("핀 등록에 실패했습니다.");
    const data: APIResponse = await res.json();
    return {
      success: true,
      newPinId: data.results[0].id,
      errorMessage: "",
    };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      newPinId: null,
      errorMessage: "핀 등록에 실패했습니다.",
    };
  }
};
export default fetchPostPin;
