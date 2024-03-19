import { ProfileMine } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";

const fetchGetMyProfile = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`,
      {
        credentials: "include",
      }
    );
    console.log("fetchGetMyProfile res", res);
    if (!res.ok) throw new Error("내 프로필 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetMyProfile data", data);
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
