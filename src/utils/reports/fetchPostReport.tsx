import { logout } from "@/hooks/useLogout";
import { PlatformType, ComplaintCategory } from "@/types/Report";

const fetchPostReport = async (
  platformType: PlatformType,
  complaintCategory: ComplaintCategory,
  reason: string,
  targetId: number
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platformType: platformType,
        complaintCategory: complaintCategory,
        reason: reason,
        targetId: targetId,
      }),
    });
    console.log("fetchPostReport", res);
    if (res.status === 401) {
      logout();
      return { success: false, errorMessage: "로그인이 필요합니다." };
    }
    if (!res.ok) throw new Error("신고에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "신고에 실패했습니다.",
    };
  }
};
export default fetchPostReport;
