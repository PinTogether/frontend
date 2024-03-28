import { ProfileFollower } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetMyFollowers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me/followers`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetMyFollowers res", res);
    if (res.status === 401) {
      logout();
      return { followers: null, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("내 팔로워 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetMyFollowers data", data);
    const followers: ProfileFollower[] = data.results;
    if (followers.length === 0) {
      return { followings: [], errorMessage: "팔로워 목록이 없습니다." };
    }
    return { followers, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      followers: null,
      errorMessage: "내 팔로워 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetMyFollowers;
