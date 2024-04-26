import SubPageLayout from "@/containers/layout/SubPageLayout";
import CollectionPageSkeleton from "@/containers/collection/CollectionPageSkeleton";

export default function Loading() {
  return (
    <SubPageLayout topperMsg={"컬렉션 조회"}>
      <CollectionPageSkeleton />
    </SubPageLayout>
  );
}
