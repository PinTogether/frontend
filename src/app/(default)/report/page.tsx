import ReportPage from "@/containers/report/ReportPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <ReportPage />;
}
