import CollectionPage from "@/containers/collection/CollectionPage";

type PageParams ={
  id: number;
}

export default function Page({params}:{params:PageParams}) {
  return (
    <CollectionPage id={params.id} />
  );
}
