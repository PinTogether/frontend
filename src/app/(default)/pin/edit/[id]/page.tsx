import SubPageLayout from "@/containers/layout/SubPageLayout";
import PinEditPage from "@/containers/pin/PinEditPage";

export default function Page({ params }: { params: { id: string } }) {
  return <PinEditPage pinId={params.id} />;
}
