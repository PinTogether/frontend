import SubPageLayout from "@/containers/layout/SubPageLayout";
import NotifyPage from "@/containers/notify/NotifyPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <SubPageLayout topperMsg="알림">
      <NotifyPage />
    </SubPageLayout>
  );
}
