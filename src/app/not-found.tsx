"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <p>일시적인 문제가 발생했습니다</p>
      <button onClick={() => router.back()}>
        <p>뒤로 가기</p>
      </button>
      <Link href={"/"}> 홈으로 가기</Link>
    </>
  );
}
