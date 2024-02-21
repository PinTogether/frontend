"use client";

import { LogoHorizontal } from "@/components/LogoSvg";
import styles from "@/styles/containers/login/_login.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("e " + event);
      if (event.data === "success") {
      } else if (event.data === "failed") {
      }
    };
    externalPopup?.addEventListener("message", handleMessage);
    return () => {
      if (externalPopup?.closed === false) {
        externalPopup?.removeEventListener("message", handleMessage);
      }
    };
  }, [externalPopup]);

  const handleClick = ({
    loginType,
  }: {
    loginType: "google" | "kakao" | "naver";
  }) => {
    externalPopup?.close();
    const width = 500; // 팝업의 가로 길이: 500
    const height = 600; // 팝업의 세로 길이 : 500
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    setExternalPopup(
      window.open(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/${loginType}`,
        `${loginType} login`,
        `width=${width},height=${height},left=${left},top=${top},popup=yes`
      )
    );
  };

  return (
    <div className={styles.page}>
      <LogoHorizontal />
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleClick({ loginType: "naver" })}
          className={styles.naverButton}
        >
          <Image width={16} height={16} src={"/logo/naver.svg"} alt="naver" />
          <span>네이버 로그인</span>
        </button>
        <button
          onClick={() => handleClick({ loginType: "kakao" })}
          className={styles.kakaoButton}
        >
          <Image width={20} height={20} src={"/logo/kakao.svg"} alt="kakao" />
          <span>카카오 로그인</span>
        </button>
        <button
          onClick={() => handleClick({ loginType: "google" })}
          className={styles.googleButton}
        >
          <Image width={18} height={18} src={"/logo/google.svg"} alt="google" />
          <span>구글 로그인</span>
        </button>
      </div>
      <footer>
        <a>서비스 이용약관</a>
        <p>|</p>
        <a>개인정보 처리방침</a>
      </footer>
    </div>
  );
}