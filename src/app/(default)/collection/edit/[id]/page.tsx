import CollectionEditPage from "@/containers/collection/edit/CollectionEditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

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
