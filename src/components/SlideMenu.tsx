import styles from "@/styles/components/_slideMenu.module.scss";
import React, { useEffect, useRef, useState } from "react";

export { SlideMenu, SlideMenuInnerPage };

const SlideMenu = ({
  menuTitleList,
  children,
}: {
  menuTitleList: string[];
  children: React.ReactNode[];
}) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const menuSelectLine = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const pageRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const firstMenu = menuRef.current?.children[0] as HTMLLIElement;
    if (firstMenu) {
      resizeMenuSelectLine(firstMenu.clientWidth, firstMenu.offsetLeft);
    }
  }, []);

  // useEffect(() => {
  //   let startPoint = 0;
  //   let endPoint = 0;
  //   const handleTouchStart = (e: TouchEvent) => {
  //     startPoint = e.changedTouches[0].clientX;
  //   };
  //   const handleTouchEnd = (e: TouchEvent) => {
  //     endPoint = e.changedTouches[0].clientX;
  //     console.log(startPoint - endPoint);
  //     if (
  //       startPoint - endPoint > 50 &&
  //       selectedMenu < menuTitleList.length - 1
  //     ) {
  //       slidePage(selectedMenu + 1);
  //     } else if (startPoint - endPoint < -50 && selectedMenu > 0) {
  //       slidePage(selectedMenu - 1);
  //     }
  //   };
  //   pageRef.current?.addEventListener("touchstart", handleTouchStart);
  //   pageRef.current?.addEventListener("touchend", handleTouchEnd);
  //   return () => {
  //     pageRef.current?.removeEventListener("touchstart", handleTouchStart);
  //     pageRef.current?.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, [pageRef, pageRef.current?.clientWidth]);

  const handleClickMenu = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    // slidePage(index);
    resizeMenuSelectLine(
      (e.target as HTMLLIElement).clientWidth,
      (e.target as HTMLLIElement).offsetLeft
    );
    setSelectedMenu(index);
  };

  // const slidePage = (index: number) => {
  //   if (index < 0 || index >= menuTitleList.length) return;
  //   console.log("index", index);
  //   setSelectedMenu(index);
  //   const selectedPage = pageRef.current?.children[index] as HTMLLIElement;
  //   selectedPage.scrollIntoView({ behavior: "smooth" });
  // };

  const resizeMenuSelectLine = (width: number, left: number) => {
    menuSelectLine.current?.style.setProperty(
      "transform",
      `translateX(${left}px)`
    );
    menuSelectLine.current?.style.setProperty("width", `${width}px`);
  };

  return (
    <div className={styles.slideMenuLayout}>
      <ul className={styles.menuList} ref={menuRef}>
        {menuTitleList.map((menuTitle, index) => (
          <li
            key={index}
            className={`${styles.menuCategory} ${selectedMenu === index && styles.active}`}
            onClick={(e) => handleClickMenu(e, index)}
          >
            {menuTitle}
          </li>
        ))}
        <div ref={menuSelectLine} className={`${styles.menuSelectLine}`} />
      </ul>
      <ul className={styles.pageUl} ref={pageRef}>
        {children[selectedMenu]}
        {/* {children.map((child, index) => (
          <li className={styles.pageLi} key={index}>
            {child}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
export default SlideMenu;

const SlideMenuInnerPage = ({ children }: { children: React.ReactNode }) => {
  // const ref = useRef<HTMLDivElement>(null);
  return <div className={styles.slideMenuInnerPage}>{children}</div>;
};
