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
    title: `${collectionInfo.title} ∙ pintogether`,
    description: `${collectionInfo.details}`,
    applicationName: "pintogether",
    authors: [
      {
        name: `${collectionInfo.writerMembername} ∙ pintogether`,
        url: `https://pintogether.co.kr/profile/${collectionInfo.writerMembername}`,
      },
      {
        name: `pintogether team`,
        url: `https://github.com/PinTogether`,
      },
    ],
    keywords: [
      ...collectionInfo.tags,
      "pintogether",
      "핀투게더",
      "장소",
      "지도",
      "컬렉션",
      "핀",
      "공유",
      "리뷰",
      "맛집",
    ],
    openGraph: {
      title: `${collectionInfo.title} ∙ pintogether`,
      description: `${collectionInfo.details} / ${collectionInfo.tags.join(", ")}`,
      images: [collectionInfo?.thumbnail],
      type: "website",
      url: `https://pintogether.co.kr/collection/${collectionId}`,
      locale: "ko_KR",
      siteName: "pintogether",
    },
  };
}

export default function Page({ params }: PageParams) {
  return <CollectionPage collectionId={params.id} />;
}
