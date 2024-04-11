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
    title: `${placeInfo.name}`,
    description: `${placeInfo.placePinCnt}개의 핀 / ${placeInfo.roadNameAddress}`,
    applicationName: "pintogether",
    generator: "Next.js 14",
    keywords: [placeInfo.name, placeInfo.category, "pintogether", "place"],
    creator: "pintogether team",
    robots: "index, follow",

    openGraph: {
      title: `${placeInfo.name}`,
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
