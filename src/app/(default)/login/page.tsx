import LoginPage from "@/containers/login/LoginPage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

export default function Page() {
  return (
    <SubPageLayout topperMsg="로그인">
      <LoginPage />
    </SubPageLayout>
  );
}
