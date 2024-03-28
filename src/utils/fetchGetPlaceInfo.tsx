import { PlaceDetail } from "@/types/Place";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetPlaceInfo = async (
  placeId: number
): Promise<{ placeInfo: PlaceDetail | null; errorMessage: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetPlaceInfo res", res);
    if (res.status === 401) {
      logout();
      return {
        placeInfo: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (res.status === 404) {
      return { placeInfo: null, errorMessage: "장소 정보가 없습니다." };
    }
    if (!res.ok) throw new Error("장소 정보 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetPlaceInfo data", data);
    const placeInfo: PlaceDetail = data.results[0];
    return { placeInfo: placeInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      placeInfo: null,
      errorMessage: "장소 정보 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetPlaceInfo;
