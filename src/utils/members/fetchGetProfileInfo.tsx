import { ProfileOthers } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetProfileInfo = async (userId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/id/${userId}`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return {
        profileInfo: null,
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (res.status === 404) {
      return {
        profileInfo: null,
        errorMessage: "존재하지 않는 사용자입니다.",
      };
    }
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
