// Next의 <Script> 실패
// maincontent 컴포넌트로 크기조정 버튼과 children을 옮기면 use client 레이아웃에서 제거가능 완
// script 노출문제는 레이아웃에 use client 사용하지않게 수정 하면 해결될듯 -> 안됨

import "../globals.css";
import styles from "@/styles/layout/_layout.module.scss";
import Map from "@/containers/map/Map";
import Sidebar from "@/containers/layout/Sidebar";
import Maincontent from "@/containers/layout/Maincontent";

import Providers from "@/utils/Providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pintogether",
  description:
    "내가 좋아하는 장소에 핀리뷰를 남기고, 컬렉션에 저장하여 친구들과 공유해보세요!",
  icons: {
    icon: [
      {
        url: "/logo/favicon.png",
        // media: "(prefers-color-scheme: light)",
      },
    ],
  },
  applicationName: "pintogether",
  authors: [
    {
      name: `pintogether team`,
      url: `https://github.com/PinTogether`,
    },
  ],
  generator: "Next.js 14",
  keywords: [
    "pintogether",
    "pin",
    "핀투게더",
    "together",
    "같이",
    "장소",
    "지도",
    "컬렉션",
    "핀",
    "공유",
    "리뷰",
    "친구",
  ],
  creator: "pintogether team",
  robots: "index, follow", // 크롤러 탐색
  openGraph: {
    title: `Pintogether`,
    description: `내가 좋아하는 장소에 핀리뷰를 남기고, 컬렉션에 저장하여 친구들과 공유해보세요!`,
    images: [
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/pintogether/logo-horizontal.jpg",
      "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/pintogether/logo-sqaure.png",
    ],
    url: "https://www.pintogether.co.kr",
    locale: "ko_KR",
    siteName: "pintogether",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <section className={styles.container}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
        <section className={styles.map}>
          <Map />
        </section>
        <main className={styles.maincontent}>
          <Maincontent>{children}</Maincontent>
        </main>
      </section>
    </Providers>
  );
}
