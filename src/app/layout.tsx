// Next의 <Script> 실패
// maincontent 컴포넌트로 크기조정 버튼과 children을 옮기면 use client 레이아웃에서 제거가능 완
// script 노출문제는 레이아웃에 use client 사용하지않게 수정 하면 해결될듯 -> 안됨

// import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <head>
        </head>
        <body>
          {children}
        </body>
      </html>
  )
}
