import ProfilePage from "@/containers/profile/ProfilePage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

export default function Page() {
  return (
    <SubPageLayout topperMsg="프로필">
      <ProfilePage />
    </SubPageLayout>
  );
}
