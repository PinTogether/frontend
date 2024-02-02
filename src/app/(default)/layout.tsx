// Next의 <Script> 실패
// maincontent 컴포넌트로 크기조정 버튼과 children을 옮기면 use client 레이아웃에서 제거가능 완
// script 노출문제는 레이아웃에 use client 사용하지않게 수정 하면 해결될듯 -> 안됨

import '../globals.css'
import styles from "@/styles/layout/_layout.module.scss"
import Map from '@/containers/map/Map'
import Sidebar from '@/containers/layout/Sidebar'
import Maincontent from '@/containers/layout/Maincontent'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <section className={styles.map}>
        <Script
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
            strategy="beforeInteractive"
          />
        <Map />
      </section>
      <main className={styles.maincontent}>
        <Maincontent>
          {children}
        </Maincontent>
      </main>
    </section>
  )
}
