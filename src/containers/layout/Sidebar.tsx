"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { mainContentWidthByAmount } from "@/redux/locationSlice";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AddSquareFillIcon,
  AddSquareIcon,
  BellFillIcon,
  BellIcon,
  HomeFillIcon,
  HomeIcon,
  MapFillIcon,
  MapIcon,
  SearchFillIcon,
  SearchIcon,
  SignInSquareIcon,
} from "@/components/IconSvg";
import styles from "@/styles/layout/_sidebar.module.scss";
import Image from "next/image";
import getMyProfileFromLocalStorage from "@/utils/getMyProfileFromLocalStorage";
import { ProfileMine } from "@/types/Profile";

export default function Sidebar() {
  const size = 500;
  const userId = 1; // 나중에 수정해야함
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const FlexbarWidth = useAppSelector(
    (state) => state.location.mainContentWidth
  );
  const [beforeWidth, setBeforeWidth] = useState<string>("500px");
  const [myProfile, setMyProfile] = useState<ProfileMine | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(
    "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/profile1.png"
  );

  function moveURL(url: string) {
    if (FlexbarWidth == "0px") {
      dispatch(mainContentWidthByAmount("500px"));
    }
    router.push(url);
  }

  function currentPath(path: string) {
    if (path == pathname) return true;
    return false;
  }

  function changeSideWidth() {
    if (FlexbarWidth == "0px") {
      dispatch(mainContentWidthByAmount(beforeWidth));
    } else if (FlexbarWidth == "500px") {
      dispatch(mainContentWidthByAmount("0px"));
      setBeforeWidth("500px");
    } else if (FlexbarWidth == "95%") {
      dispatch(mainContentWidthByAmount("0px"));
      setBeforeWidth("95%");
    }
  }

  useEffect(() => {
    setMyProfile(getMyProfileFromLocalStorage);
  }, []);

  useEffect(() => {
    if (myProfile) {
      setImgSrc(myProfile.avatar);
    } else if (process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL) {
      setImgSrc(process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL);
    } else {
      setImgSrc(
        "https://pintogether-img.s3.ap-northeast-2.amazonaws.com/default/profile1.png"
      );
    }
  }, [myProfile]);

  return (
    <section className={styles.container}>
      <div></div>
      <button
        className={`${styles.button} ${currentPath("/") ? styles.currPath : ""}`}
        onClick={() => moveURL("/")}
      >
        <HomeIcon className={`${styles.icon}`} />
        <HomeFillIcon className={styles.hoveredIcon} />
      </button>
      <button className={styles.button} onClick={() => changeSideWidth()}>
        <MapIcon className={styles.icon} />
        <MapFillIcon className={styles.hoveredIcon} />
      </button>
      <button
        className={`${styles.button} ${currentPath("/search") ? styles.currPath : ""}`}
        onClick={() => moveURL("/search")}
      >
        <SearchIcon className={`${styles.icon}`} />
        <SearchFillIcon className={styles.hoveredIcon} />
      </button>
      <button
        className={`${styles.button} ${usePathname().startsWith("/collection") ? styles.currPath : ""}`}
        onClick={() => moveURL("/collection/edit")}
      >
        <AddSquareIcon className={`${styles.icon}`} />
        <AddSquareFillIcon className={styles.hoveredIcon} />
      </button>
      <div></div>
      <button className={styles.button}>
        <BellIcon className={styles.icon} />
        <BellFillIcon className={styles.hoveredIcon} />
      </button>
      <button
        className={`${styles.button} ${usePathname().startsWith("/login") ? styles.currPath : ""}`}
      >
        {imgSrc && myProfile && myProfile.id ? (
          <div className={styles.profilebox}>
            <Image
              src={imgSrc}
              alt="profile image"
              className={`${styles.profile}`}
              width={size}
              height={size}
              onClick={() => moveURL(`/profile/${userId}`)}
            />
          </div>
        ) : (
          <SignInSquareIcon onClick={() => moveURL(`/login`)} />
        )}
      </button>
      <div></div>
    </section>
  );
}
