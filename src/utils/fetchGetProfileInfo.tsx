import { ProfileOthers } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";

const fetchGetProfileInfo = async (userId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${userId}`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetProfileInfo", res, res.json());
    if (!res.ok) throw new Error("프로필 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    const profileInfo: ProfileOthers = data.results[0];
    return { profileInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      profileInfo: null,
      errorMessage: "프로필 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetProfileInfo;
