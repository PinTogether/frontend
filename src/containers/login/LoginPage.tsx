"use client";

import { LogoHorizontal } from "@/components/LogoSvg";
import styles from "@/styles/containers/login/_login.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Cookies } from "react-cookie";
import { ProfileMine } from "@/types/Profile";
import { useRouter } from "next/navigation";
import APIResponse from "@/types/APIResponse";

export default function LoginPage() {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = (e: MessageEvent) => {
      if (e.origin !== process.env.NEXT_PUBLIC_FRONTEND_URL) return;
      console.log("checkLoginStatus", e);

      const oauth = new Cookies().get("Authorization");
      console.log("oauth", oauth);
      if (oauth) {
        console.log("oauth", oauth);
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`, {
          credentials: "include",
        })
          .then((res) => {
            console.log("login res", res);
            if (res.ok) return res.json();
            else throw new Error("서버 오류");
          })
          .then((data: APIResponse) => {
            console.log("login data", data);
            const myProfile: ProfileMine = data.results[0];
            localStorage.setItem("myProfile", JSON.stringify(myProfile));
          })
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage("내 정보 가져오기에 실패했습니다.");
          });
      } else setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    };

    window.addEventListener("message", checkLoginStatus);
    return () => {
      window.removeEventListener("message", checkLoginStatus);
    };
  }, []);

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
        `${loginType}s login`,
        `width=${width},height=${height},left=${left},top=${top},popup=yes`
      )
    );
    // setExternalPopup(
    //   window.open(
    //     `${process.env.NEXT_PUBLIC_FRONTEND_URL}/popup`,
    //     `${loginType}s login`,
    //     `width=${width},height=${height},left=${left},top=${top},popup=yes`
    //   )
    // );
  };

  return (
    <div id={styles.loginPage}>
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
      <div className={styles.loginErrorMessage}>{errorMessage}</div>
      <footer className={styles.footer}>
        <a>서비스 이용약관</a>
        <p>|</p>
        <a>개인정보 처리방침</a>
      </footer>
    </div>
  );
}
