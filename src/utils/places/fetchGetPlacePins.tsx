import { PinForPlace } from "@/types/Pin";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetPlacePins = async (
  placeId: number,
  page: number,
  size: number
): Promise<{ placeInfo: PinForPlace[]; errorMessage: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}/pins?page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return {
        placeInfo: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (res.status === 404) {
      return { placeInfo: [], errorMessage: "장소 정보가 없습니다." };
    }
    if (!res.ok) throw new Error("장소의 핀 정보 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    const placeInfo: PinForPlace[] = data.results;
    return { placeInfo: placeInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      placeInfo: [],
      errorMessage: "장소의 핀 정보 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetPlacePins;
