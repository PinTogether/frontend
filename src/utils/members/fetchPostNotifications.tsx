import { NotifyResponse } from "@/types/Notify";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";

const fetchPostNotifictaions = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me/notifications`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("fetchGetNotifictaions res", res);
    if (res.status === 401) {
      logout();
      return { notifications: null, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("내 알림 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetNotifictaions data", data);
    const notifications: NotifyResponse = data.results[0];
    return { notifications, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      notifications: null,
      errorMessage: "내 알림 가져오기에 실패했습니다.",
    };
  }
};
export default fetchPostNotifictaions;
