"use client"
 // Next의 <Script> 실패
 // 메인콘텐트를 전체로 덮고 children과 버튼을 다른 컴포넌트로 빼기 -> (조작은 되나 z-index때문에 지도가 덮여서 조작불가)

// script 노출문제는 레이아웃에 use client 사용하지않게 수정 하면 해결될듯

import { useState } from "react";
import './globals.css'
import styles from "@/styles/layout/_layout.module.scss"
import Map from '@/components/Map'
import Sidebar from '@/components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [FlexbarWidth, setFlexBarWidth] = useState("650px");

  const toggleFlexBarWidth = () => {
    setFlexBarWidth((prevWidth) => {
      if (prevWidth === "0px") return "650px"; // 0이면 600으로 변경
      if (prevWidth === "650px") return "98%"; // 600이면 전체 화면 너비로 변경(슬라이드 바 부분 제외)
      return "0px"; // 나머지 경우에는 0으로 변경
    });
  };

  return (
      <html lang="en">
        <head>
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
          async
        /> {/* https://nextjs.org/docs/messages/no-sync-scripts */}
        </head>
        <body>
          <section className={styles.container}>
            <aside className={styles.sidebar}>
              <Sidebar />
            </aside>
            <section className={styles.map}>
              <Map />
            </section>
            <div className={styles.maincontent} style={{width:FlexbarWidth}}>
              <main>
                {
                  FlexbarWidth != "0px" &&
                  <div>
                    {children}
                  </div>
                }
              </main>
            </div>
            <button onClick={toggleFlexBarWidth} className={styles.mainButton}>버튼1</button>
          </section>
        </body>
      </html>
  )
}
