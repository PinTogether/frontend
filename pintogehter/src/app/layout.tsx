"use client"

import { useState } from "react";
import './globals.css'
import styles from "@/styles/layout/_layout.module.scss"
import Map from '@/components/Map'
import Test from '@/components/Test'

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
        <Test></Test>
        <body>
          <section className={styles.container}>
            <aside className={styles.sidebar}>
              사이드바
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
          Footer들어갈자리
        </body>
      </html>
  )
}
