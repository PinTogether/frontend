import APIResponse from "@/types/APIResponse";
import PresignedUrl from "@/types/PresingedUrl";
import { logout } from "@/hooks/useLogout";

const fetchPostPinPresignedUrl = async (
  pinId: number,
  contentTypeList: string[]
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pins/${pinId}/images/presigned-url`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: contentTypeList }),
      }
    );
    console.log("fetchGetAvatarPresignedUrl res", res);
    if (res.status === 401) {
      logout();
      return {
        presignedUrlDataList: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (!res.ok) throw new Error("presinged url 발급에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetAvatarPresignedUrl data", data);
    const presignedUrlDataList: PresignedUrl[] = data.results;
    return { presignedUrlDataList, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      presignedUrlDataList: null,
      errorMessage: "presinged url 발급에 실패했습니다.",
    };
  }
};
export default fetchPostPinPresignedUrl;
