import SubPageLayout from "@/containers/layout/SubPageLayout";
import ReportDetailsPage from "@/containers/report/ReportDetailsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <SubPageLayout topperMsg="신고내역 조회">
      <ReportDetailsPage />
    </SubPageLayout>
  );
}
