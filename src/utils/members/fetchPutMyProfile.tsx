import { logout } from "@/hooks/useLogout";

const fetchPutMyProfile = async (
  name: string,
  membername: string,
  bio: string,
  avatar: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          membername: membername,
          bio: bio,
          avatar: avatar,
        }),
      }
    );
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("프로필 수정에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "프로필 수정에 실패했습니다.",
    };
  }
};
export default fetchPutMyProfile;
