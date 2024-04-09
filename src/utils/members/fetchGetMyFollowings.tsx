import { ProfileFollower } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetMyFollowings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me/followings`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return { followings: null, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("내 팔로워 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    const followings: ProfileFollower[] = data.results;
    if (followings.length === 0) {
      return { followings: [], errorMessage: "팔로잉 목록이 없습니다." };
    }
    return { followings, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      followings: null,
      errorMessage: "내 팔로워 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetMyFollowings;
