import ProfileSettingPage from "@/containers/profile/ProfileSettingPage";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <SubPageLayout topperMsg="설정">
      <ProfileSettingPage />
    </SubPageLayout>
  );
}
