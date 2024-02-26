import SubPageLayout from "@/containers/layout/SubPageLayout";
import SelectCollectionPage from "@/containers/pin/SelectCollectionPage";

export default function Page() {
  return (
    <SubPageLayout topperMsg="컬렉션 선택">
      <SelectCollectionPage />
    </SubPageLayout>
  );
}
