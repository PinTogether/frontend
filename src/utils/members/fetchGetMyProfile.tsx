import { ProfileMine } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetMyProfile = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      return { profileInfo: null, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("내 프로필 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    const profileInfo: ProfileMine = data.results[0];
    return { profileInfo, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      profileInfo: null,
      errorMessage: "내 프로필 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetMyProfile;
