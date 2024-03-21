import CollectionEditPage from "@/containers/collection/CollectionEditPage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

type PageParams = {
  id: number;
};

export default function Page({ params }: { params: PageParams }) {
  return (
    // <SubPageLayout topperMsg="컬렉션 수정">
    <CollectionEditPage topperMsg="컬렉션 수정" collectionId={params.id} />
    // </SubPageLayout>
  );
}
