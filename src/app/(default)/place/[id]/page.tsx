import SubPageLayout from "@/containers/layout/SubPageLayout";
import PlacePage from "@/containers/place/PlacePage";
import fetchGetPlaceInfo from "@/utils/places/fetchGetPlaceInfo";
import { Metadata } from "next";

type PageParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const placeId = Number(params.id) || 0;

  const { placeInfo, errorMessage } = await fetchGetPlaceInfo(placeId);

  if (!placeInfo) {
    return {
      title: errorMessage,
      description: errorMessage,
    };
  }
  return {
    title: `${placeInfo.name} ∙ pintogether`,
    description: `${placeInfo.placePinCnt}개의 핀 / ${placeInfo.roadNameAddress}`,
    keywords: [
      placeInfo.name,
      placeInfo.category,
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
      title: `${placeInfo.name} ∙ pintogether`,
      description: `${placeInfo.placePinCnt}개의 핀 / ${placeInfo.roadNameAddress}`,
      type: "website",
      url: `https://pintogether.co.kr/place/${placeId}`,
      locale: "ko_KR",
      siteName: "pintogether",
    },
  };
}

export default function Page({ params }: PageParams) {
  return (
    <SubPageLayout topperMsg="장소 조회">
      <PlacePage placeId={params.id} />
    </SubPageLayout>
  );
}
