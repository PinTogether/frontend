import { ProfileOthers } from "@/types/Profile";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchGetMemberNameValid = async (membername: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/profile-setting/membername-valid?membername=${membername}`,
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
    if (!res.ok) throw new Error("사용자 이름 유효성 검사에 실패했습니다.");
    const data: APIResponse = await res.json();
    if (!data.results[0].valid) {
      return {
        valid: data.results[0].valid,
        errorMessage: "이미 사용 중인 사용자 이름입니다.",
      };
    }
    return {
      valid: data.results[0].valid,
      errorMessage: "",
    };
  } catch (err: any) {
    console.error(err);
    return {
      profileInfo: null,
      errorMessage: "사용자 이름 유효성 검사에 실패했습니다..",
    };
  }
};
export default fetchGetMemberNameValid;
