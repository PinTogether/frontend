import SubPageLayout from "@/containers/layout/SubPageLayout";
import PinEditPage from "@/containers/pin/PinEditPage";

export default function Page() {
  return (
    <SubPageLayout topperMsg="핀 추가 및 수정">
      <PinEditPage />
    </SubPageLayout>
  );
}
