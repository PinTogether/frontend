import { PinForPlace } from "@/types/Pin";
import APIResponse from "@/types/APIResponse";
import { logout } from "@/hooks/useLogout";
import { Report } from "@/types/Report";

const fetchGetReport = async (
  page: number,
  size: number
): Promise<{ reportList: Report[]; errorMessage: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reports?page=${page}&size=${size}`,
      {
        credentials: "include",
      }
    );
    if (res.status === 401) {
      logout();
      return {
        reportList: [],
        errorMessage: "로그인이 필요합니다.",
      };
    }
    if (res.status === 404) {
      return { reportList: [], errorMessage: "신고 목록이 없습니다." };
    }
    if (!res.ok) throw new Error("신고 목록 가져오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    const reportList: Report[] = data.results;
    return { reportList: reportList, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      reportList: [],
      errorMessage: "신고 목록 가져오기에 실패했습니다.",
    };
  }
};
export default fetchGetReport;
