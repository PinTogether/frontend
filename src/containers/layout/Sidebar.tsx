"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { mainContentWidthByAmount } from "@/redux/locationSlice";
import { useRouter, usePathname } from "next/navigation";
import { AddSquareFillIcon, AddSquareIcon, BellFillIcon, BellIcon, HomeFillIcon, HomeIcon, MapFillIcon, MapIcon, SearchFillIcon, SearchIcon } from "@/components/IconSvg";
import styles from "@/styles/layout/_sidebar.module.scss";
import Image from "next/image";

export default function Sidebar() {
  const size = 300;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const FlexbarWidth = useAppSelector((state) => state.location.mainContentWidth);

  function moveURL(url:string){
    if(FlexbarWidth == "0px"){
      dispatch(mainContentWidthByAmount("500px"));
    }
    router.push(url);
  }

  function currentPath(path:string){
    if(path == pathname)
      return true;
    return false;
  };

  return (
    <section className={styles.container}>
      <div></div>
      <button className={styles.button} onClick={() => moveURL("/")}>
        <HomeIcon className={`${styles.icon} ${currentPath("/") ? styles.currPath : ''}`}/>
        <HomeFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button}>
        <MapIcon className={styles.icon}/>
        <MapFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button} onClick={() => moveURL("/search")}>
        <SearchIcon className={`${styles.icon} ${currentPath("/search") ? styles.currPath : ''}`}/>
        <SearchFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button} onClick={() => moveURL("/collection")}>
        <AddSquareIcon className={`${styles.icon} ${currentPath("/collection") ? styles.currPath : ''}`}/>
        <AddSquareFillIcon className={styles.hoveredIcon}/>
      </button>
      <div></div>
      <button className={styles.button}>
        <BellIcon className={styles.icon}/>
        <BellFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button} onClick={() => moveURL("/profile")}>
        <div className={styles.profilebox}>
          <Image
            src="/images/cat_dummy.jpeg"
            alt="profile image"
            className={`${styles.profile} ${currentPath("/profile") ? styles.currPathProfile : ''}`}
            width={size}
            height={size}
          />
        </div>
      </button>
      <div></div>
    </section>
  );
}
