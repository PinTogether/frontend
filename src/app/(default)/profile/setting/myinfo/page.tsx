import ProfileMyInfoPage from "@/containers/profile/ProfileMyInfoPage";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <SubPageLayout topperMsg="내 정보 관리">
      <ProfileMyInfoPage />
    </SubPageLayout>
  );
}
