import SubPageLayout from "@/containers/layout/SubPageLayout";
import PinSelectPage from "@/containers/pin/PinSelectPage";

export default function Page() {
  return (
    <SubPageLayout topperMsg="새로운 장소 핀하기">
      <PinSelectPage />
    </SubPageLayout>
  );
}
