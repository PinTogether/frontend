import SubPageLayout from "@/containers/layout/SubPageLayout";
import PlacePage from "@/containers/place/PlacePage";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <SubPageLayout topperMsg="장소 조회">
      <PlacePage placeId={params.id} />
    </SubPageLayout>
  );
}
