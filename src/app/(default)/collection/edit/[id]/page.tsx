import CollectionEditPage from "@/containers/collection/CollectionEditPage";

type PageParams ={
  id: number;
}

export default function Page({ params }:{params:PageParams}) {
  return (
    <CollectionEditPage id={params.id} />
  );
}
