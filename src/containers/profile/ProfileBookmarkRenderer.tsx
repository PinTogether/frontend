"use client";

import { useState } from "react";
import { PlaceStared } from "@/types/Place";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { PinIcon } from "@/components/IconSvg";

export default function ProfileBookmarkRenderer({
  bookmarks,
}: {
  bookmarks: PlaceStared[];
}) {
  function onChangeClickedBookmark(id: number) {
    if (selectMode) {
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
  }

  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [clickedBookmarks, setClickedBookmarks] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  const handleMouseDown = () => {
    if (!selectMode) {
      const intervalId = setTimeout(() => {
        setSelectMode(true);
        setClickedBookmarks([]);
      }, 1000);
      setIsButtonPressed(true);
      const handleMouseUp = () => {
        clearTimeout(intervalId);
        setIsButtonPressed(false);
      };
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  return (
    <section className={styles.bookmarkOuterContainer}>
      <div className={styles.bookmarkButtonContainer}>
        {selectMode && (
          <>
            <button className={styles.bookmarkButton}>선택 찜 삭제</button>
            <button className={styles.bookmarkButton}>
              선택 찜 컬렉션에 추가
            </button>
            <button
              className={styles.bookmarkButton}
              onClick={() => {
                setSelectMode(false), setClickedBookmarks([])
              }}
            >
              선택모드 취소
            </button>
          </>
        )}
      </div>
      <section className={styles.profileBookmarkContainer}>
        {bookmarks.map((bookmark, index) => (
          <button
            onClick={() => {
              onChangeClickedBookmark(bookmark.id);
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setIsButtonPressed(false)}
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
