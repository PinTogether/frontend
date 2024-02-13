"use client";

import { useRouter, usePathname } from "next/navigation";
import { AddSquareFillIcon, AddSquareIcon, BellFillIcon, BellIcon, HeartFillIcon, HeartIcon, HomeFillIcon, HomeIcon, MapFillIcon, MapIcon, SearchFillIcon, SearchIcon } from "@/components/IconSvg";
import styles from "@/styles/layout/_sidebar.module.scss";
import Image from "next/image";

export default function Sidebar() {
  // Image 의 필수 요소 때문에 width, height 를 지정해 주었지만, 영향을 미치지 않습니다.
  const size = 300;
  const router = useRouter();
  const pathname = usePathname();

  function currentPath(path:string){
    if(path == pathname)
      return true;
    return false;
  };

  return (
    <section className={styles.container}>
      <div></div>
      <button className={styles.button} onClick={() => router.push("/")}>
        <HomeIcon className={`${styles.icon} ${currentPath("/") ? styles.currPath : ''}`}/>
        <HomeFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button}>
        <MapIcon className={styles.icon}/>
        <MapFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button} onClick={() => router.push("/search")}>
        <SearchIcon className={`${styles.icon} ${currentPath("/search") ? styles.currPath : ''}`}/>
        <SearchFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button} onClick={() => router.push("/collection")}>
        <AddSquareIcon className={`${styles.icon} ${currentPath("/collection") ? styles.currPath : ''}`}/>
        <AddSquareFillIcon className={styles.hoveredIcon}/>
      </button>
      <div></div>
      <button className={styles.button}>
        <BellIcon className={styles.icon}/>
        <BellFillIcon className={styles.hoveredIcon}/>
      </button>
      <button className={styles.button} onClick={() => router.push("/profile")}>
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
