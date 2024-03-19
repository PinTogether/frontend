import APIResponse from "@/types/APIResponse";
import PresignedUrl from "@/types/PresingedUrl";

const fetchGetAvatarPresignedUrl = async (contentType: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/me/avatar/presinged-url`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ contentType: contentType }),
      }
    );
    console.log("fetchGetAvatarPresignedUrl", res, res.json());
    if (!res.ok) throw new Error("presinged url 발급에 실패했습니다.");
    const data: APIResponse = await res.json();
    const presignedUrlData: PresignedUrl = data.results[0];
    return { presignedUrlData, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      presignedUrlData: null,
      errorMessage: "presinged url 발급에 실패했습니다.",
    };
  }
};
export default fetchGetAvatarPresignedUrl;
