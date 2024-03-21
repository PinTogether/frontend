import { PinForPlace } from "@/types/Pin";
import APIResponse from "@/types/APIResponse";

const fetchGetCollectionAllPins = async (collectionId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${collectionId}/pins`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetCollectionAllPins res", res);
    if (!res.ok) throw new Error("핀 리스트 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetCollectionAllPins data", data);
    const pinInfo: PinForPlace[] = data.results;
    console.log("pinInfo", pinInfo);
    return { pinInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      pinInfo: null,
      errorMessage: "핀 리스트F 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetCollectionAllPins;
