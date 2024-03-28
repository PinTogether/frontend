import { logout } from "@/hooks/useLogout";

const fetchPostPinToCollections = async (
  placeId: number,
  collectionIdList: number[]
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pins/selected-collections`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId: placeId,
          collectionId: collectionIdList,
        }),
      }
    );
    console.log("fetchPostPinToCollections", res);
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("핀 등록에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "핀 등록에 실패했습니다.",
    };
  }
};
export default fetchPostPinToCollections;
