"use client";

import { useState } from "react";
import IBookmark from "@/types/IBookmark";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { PinIcon } from "@/components/IconSvg";

export default function ProfileBookmarkRenderer({
  bookmarks,
}: {
  bookmarks: IBookmark[];
}) {
  function onChangeClickedBookmark(id: number) {
    const newList = [...clickedBookmarks];
    if (newList.includes(id)) {
      const i = newList.indexOf(id);
      newList.splice(i, 1);
    } else {
      newList.push(id);
    }
    setClickedBookmarks(newList);
    console.log(clickedBookmarks);
  }

  const [clickedBookmarks, setClickedBookmarks] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  function changeSelectMode() {
    if (selectMode) {
      setSelectMode(false);
    } else {
      setSelectMode(true);
    }
  }

  function onLongClick() {
    const timer = setTimeout(changeSelectMode, 1500);
  }

  return (
    <section className={styles.bookmarkOuterContainer}>
      <div className={styles.bookmarkButtonContainer}>
        {selectMode && (
          <>
            <button className={styles.bookmarkButton}>선택 찜 삭제</button>
            <button className={styles.bookmarkButton}>
              선택 찜 컬렉션에 추가
            </button>
            <button className={styles.bookmarkButton}>선택모드 취소</button>
          </>
        )}
      </div>
      <section className={styles.profileBookmarkContainer}>
        {bookmarks.map((bookmark, index) => (
          <button
            /*onClick={() => {
              onChangeClickedBookmark(bookmark.id);
            }}*/
            onMouseDown={()=>{onLongClick()}}
            key={index}
            className={`${styles.bookmarkContainer} ${clickedBookmarks.includes(bookmark.id) ? styles.bookmarkContainerClicked : ""}`}
          >
            <PinIcon style={{ width: "25px", height: "25px" }} />
            <section className={styles.bookmarkData}>
              <b>{bookmark.name}</b>
              <div>{bookmark.category}</div>
              <div>{bookmark.address}</div>
            </section>
          </button>
        ))}
      </section>
    </section>
  );
}
