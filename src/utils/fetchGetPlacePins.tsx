import { PinForPlace } from "@/types/Pin";
import APIResponse from "@/types/APIResponse";

const fetchGetPlacePins = async (
  placeId: number,
  page: number,
  size: number
): Promise<{ placeInfo: PinForPlace[] | null; errorMessage: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}/pins?page=${page}&size=${size}}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetPlacePins res", res);
    if (res.status === 404) {
      return { placeInfo: null, errorMessage: "장소 정보가 없습니다." };
    }
    if (!res.ok) throw new Error("장소의 핀 정보 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetPlacePins data", data);
    const placeInfo: PinForPlace[] = data.results;
    return { placeInfo: placeInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      placeInfo: null,
      errorMessage: "장소의 핀 정보 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetPlacePins;
