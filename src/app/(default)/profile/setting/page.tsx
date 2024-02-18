import ProfileSettingPage from "@/containers/profile/ProfileSettingPage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

export default function Page() {
  return (
    <SubPageLayout topperMsg="설정">
      <ProfileSettingPage />
    </SubPageLayout>
  );
}
