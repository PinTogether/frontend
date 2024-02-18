import ProfileMyInfoPage from "@/containers/profile/ProfileMyInfoPage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

export default function Page() {
  return (
    <SubPageLayout topperMsg="내 정보 관리">
      <ProfileMyInfoPage />
    </SubPageLayout>
  );
}
