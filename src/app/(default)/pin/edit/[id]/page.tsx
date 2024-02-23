import SubPageLayout from "@/containers/layout/SubPageLayout";
import PinEditPage from "@/containers/pin/PinEditPage";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <SubPageLayout topperMsg="핀 추가 및 수정">
      <PinEditPage pinId={params.id} />
    </SubPageLayout>
  );
}
