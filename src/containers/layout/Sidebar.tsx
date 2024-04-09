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
  UserBoxIcon,
  UserBoxFillIcon,
} from "@/components/IconSvg";
import styles from "@/styles/layout/_sidebar.module.scss";
import Image from "next/image";

import SidebarNotifyComponent from "./SidebarNotifyComponent";
import { useSidebarLoginStatus, useGetMyProfile } from "@/hooks/myProfileHooks";

export default function Sidebar() {
  const size = 500;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const FlexbarWidth = useAppSelector(
    (state) => state.location.mainContentWidth
  );
  const [beforeWidth, setBeforeWidth] = useState<string>("500px");

  const isLogin = useSidebarLoginStatus();
  const myProfile = useGetMyProfile();

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

  return (
    <section className={styles.container}>
      <div></div>
      <button
        className={`${styles.button} ${currentPath("/") ? styles.currPath : ""}`}
        onClick={() => moveURL("/")}
        title="메인 페이지"
      >
        <HomeIcon className={`${styles.icon}`} />
        <HomeFillIcon className={styles.hoveredIcon} />
      </button>
      <button className={styles.button} title="지도" onClick={() => changeSideWidth()}>
        <MapIcon className={styles.icon} />
        <MapFillIcon className={styles.hoveredIcon} />
      </button>
      <button
        className={`${styles.button} ${currentPath("/search") ? styles.currPath : ""}`}
        onClick={() => moveURL("/search")}
        title="검색 페이지"
      >
        <SearchIcon className={`${styles.icon}`} />
        <SearchFillIcon className={styles.hoveredIcon} />
      </button>
      <button
        className={`${styles.button} ${usePathname().startsWith("/collection") ? styles.currPath : ""}`}
        onClick={() => moveURL("/collection/edit")}
        title="컬렉션 추가"
      >
        <AddSquareIcon className={`${styles.icon}`} />
        <AddSquareFillIcon className={styles.hoveredIcon} />
      </button>
      <div></div>
      <button className={styles.button} title="알림">
        <BellIcon className={styles.icon} onClick={() => moveURL(`/notify`)} />
        <SidebarNotifyComponent />
        <BellFillIcon
          className={styles.hoveredIcon}
          onClick={() => moveURL(`/notify`)}
        />
      </button>
      <button
        className={`${styles.button} ${usePathname().startsWith("/login") ? styles.currPath : ""}`}
        title="내 프로필"
      >
        {isLogin && myProfile ? (
          <div className={styles.profilebox}>
            <Image
              src={myProfile.avatar}
              alt="profile image"
              className={`${styles.profile}`}
              width={size}
              height={size}
              onClick={() => moveURL(`/profile/${myProfile.membername}`)}
            />
          </div>
        ) : (
          <>
            <UserBoxIcon
              className={styles.icon}
              onClick={() => moveURL(`/login`)}
            />
            <UserBoxFillIcon
              className={styles.hoveredIcon}
              onClick={() => moveURL(`/login`)}
            />
          </>
        )}
      </button>
      <div></div>
    </section>
  );
}
