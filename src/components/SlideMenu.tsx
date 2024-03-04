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

  useEffect(() => {}, [menuSelectLine]);

  const handleClickMenu = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    setSelectedMenu(index);
    const width = e.currentTarget.clientWidth;
    const left = e.currentTarget.offsetLeft;
    menuSelectLine.current?.style.setProperty(
      "transform",
      `translateX(${left}px)`
    );
    menuSelectLine.current?.style.setProperty("width", `${width}px`);
  };

  return (
    <div className={styles.slideMenuLayout}>
      <ul className={styles.menuList}>
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
      {children[selectedMenu]}
    </div>
  );
};
export default SlideMenu;

const SlideMenuInnerPage = ({ children }: { children: React.ReactNode }) => {
  // const ref = useRef<HTMLDivElement>(null);
  return <div className={styles.slideMenuInnerPage}>{children}</div>;
};
