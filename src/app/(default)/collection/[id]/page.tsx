import CollectionPage from "@/containers/collection/CollectionPage";
import fetchGetCollectionInfo from "@/utils/collections/fetchGetCollectionInfo";
import { Metadata } from "next";

interface PageParams {
  params: {
    id: number;
  };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const collectionId = params.id;

  const { collectionInfo, errorMessage } =
    await fetchGetCollectionInfo(collectionId);
  if (!collectionInfo) {
    return {
      title: "컬렉션 정보를 불러오는 중 오류가 발생했습니다.",
      description: "컬렉션 정보를 불러오는 중 오류가 발생했습니다.",
    };
  }
  return {
    title: `${collectionInfo.title}`,
    description: `${collectionInfo.details}`,
    applicationName: "pintogether",
    authors: [
      {
        name: `${collectionInfo.writerMembername}`,
        url: `https://pintogether.com/profile/${collectionInfo.writerId}`,
      },
    ],
    generator: "Next.js 14",
    keywords: [...collectionInfo.tags, "pintogether", "collection"],
    // referrer
    // themeColor
    // colorScheme
    // viewport
    creator: "pintogether team",
    robots: "index, follow", // 크롤러 탐색
    // alternate
    // icons: [
    //   {
    //     src: collectionInfo.thumbnail,
    //     sizes: "192x192",
    //     type: "image/png",
    //   },
    // ],
    // manifest: {

    openGraph: {
      title: `${collectionInfo.title}`,
      description: `${collectionInfo.details} / ${collectionInfo.tags.join(", ")}`,
      images: [collectionInfo?.thumbnail],
      type: "website",
      url: `https://pintogether.com/collection/${collectionId}`,
      locale: "ko_KR",
      siteName: "pintogether",
    },
  };
}

export default function Page({ params }: PageParams) {
  return <CollectionPage collectionId={params.id} />;
}
