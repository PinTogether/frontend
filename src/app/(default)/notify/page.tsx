import SubPageLayout from "@/containers/layout/SubPageLayout";
import NotifyPage from "@/containers/notify/NotifyPage";

export default function Page() {
  return (
    <SubPageLayout topperMsg="알림">
      <NotifyPage />
    </SubPageLayout>
  );
}
