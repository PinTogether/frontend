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
    title: `${profileInfo.membername}/${profileInfo.name}의 프로필`,
    description: `${profileInfo.bio}`,
    applicationName: "pintogether",
    authors: [
      {
        name: `${profileInfo.membername}`,
        url: `https://pintogether.co.kr/profile/${profileInfo.membername}`,
      },
    ],
    generator: "Next.js 14",
    keywords: [
      profileInfo.membername,
      profileInfo.name,
      "pintogether",
      "profile",
    ],

    creator: "pintogether team",
    robots: "index, follow",

    openGraph: {
      title: `${profileInfo.membername}/${profileInfo.name}의 프로필`,
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
