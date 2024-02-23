import SubPageLayout from "@/containers/layout/SubPageLayout";
import PinPage from "@/containers/pin/PinPage";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <SubPageLayout topperMsg="핀 조회">
      <PinPage pinId={params.id} />
    </SubPageLayout>
  );
}
