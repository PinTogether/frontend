import ProfilePage from "@/containers/profile/ProfilePage";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { Metadata } from "next";
import fetchGetProfileInfoByMembername from "@/utils/members/fetchGetProfileInfoByMembername";

interface PageParams {
  params: {
    membername: string;
  };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const membername = params.membername;
  const { profileInfo, errorMessage } = await fetchGetProfileInfoByMembername(
    membername || ""
  );
  if (!profileInfo) {
    return {
      title: errorMessage,
      description: errorMessage,
    };
  }
  return {
    title: `${profileInfo.name}(${profileInfo.membername})  ∙ pintogether`,
    description: `${profileInfo.bio}`,
    icons: {
      icon: [
        {
          url: "/logo/favicon.png",
          type: "image/png",
        },
      ],
    },
    authors: [
      {
        name: `pintogether team`,
        url: `https://github.com/PinTogether`,
      },
      {
        name: `${profileInfo.name}(${profileInfo.membername})  ∙ pintogether`,
        url: `https://pintogether.co.kr/profile/${profileInfo.membername}`,
      },
    ],
    keywords: [
      profileInfo.membername,
      profileInfo.name,
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
      title: `${profileInfo.name}(${profileInfo.membername})  ∙ pintogether`,
      description: `${profileInfo.bio}`,
      images: [profileInfo?.avatar],
      type: "website",
      url: `https://pintogether.co.kr/profile/${profileInfo.membername}`,
      locale: "ko_KR",
      siteName: "pintogether",
    },
  };
}

export default function Page({ params }: PageParams) {
  return <ProfilePage membername={params.membername || ""} />;
}
