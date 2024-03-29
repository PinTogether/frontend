import styles from "@/styles/components/_slideMenu.module.scss";
import React, { useEffect, useRef, useState } from "react";

export { SlideMenu, SlideMenuInnerPage };

const SlideMenu = ({
  menuTitleList,
  customSelectedMenu = 0,
  customSetSelectedMenu,
  children,
}: {
  menuTitleList: string[];
  customSelectedMenu?: number;
  customSetSelectedMenu?: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode[];
}) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const menuSelectLine = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const pageRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    clickMenu(customSelectedMenu);
  }, [customSelectedMenu]);

  const handleClickMenu = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    clickMenu(index);
  };

  const clickMenu = (index: number) => {
    if (index < 0 || index >= menuTitleList.length) return;
    const selectedPage = menuRef.current?.children[index] as HTMLLIElement;
    resizeMenuSelectLine(selectedPage.clientWidth, selectedPage.offsetLeft);
    customSetSelectedMenu && customSetSelectedMenu(index);
    setSelectedMenu(index);
  };

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
        {children.map((child, index) => (
          <li
            className={`${styles.pageLi} ${
              index === selectedMenu ? "" : styles.hidden
            }`}
            key={index}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SlideMenu;

const SlideMenuInnerPage = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.slideMenuInnerPage}>{children}</div>;
};
