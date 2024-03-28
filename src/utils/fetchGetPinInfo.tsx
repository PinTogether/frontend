import Pin from "@/types/Pin";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetPinInfo = async (
  placeId: number
): Promise<{ pinInfo: Pin | null; errorMessage: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetPinInfo res", res);
    if (res.status === 401) {
      logout();
      return {
        pinInfo: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (res.status === 404) {
      return { pinInfo: null, errorMessage: "장소 정보가 없습니다." };
    }
    if (!res.ok) throw new Error("장소 정보 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetPinInfo data", data);
    const pinInfo: Pin = data.results[0];
    return { pinInfo: pinInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      pinInfo: null,
      errorMessage: "장소 정보 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetPinInfo;
