"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaceStarred } from "@/types/Place";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { PinIcon } from "@/components/IconSvg";


export default function ProfileBookmarkRenderer({
  bookmarks,
}: {
  bookmarks: PlaceStarred[];
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
    } else {
    }
  }
  const router = useRouter();
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [clickedBookmarks, setClickedBookmarks] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  const handleMouseDown = () => {
    const intervalId = setTimeout(() => {
      setSelectMode(true);
      setClickedBookmarks([]);
    }, 300);
    setIsButtonPressed(true);
    const handleMouseUp = () => {
      clearTimeout(intervalId);
      setIsButtonPressed(false);
    };
    document.addEventListener("mouseup", handleMouseUp);
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
                setSelectMode(false), setClickedBookmarks([]);
              }}
            >
              선택모드 취소
            </button>
          </>
        )}
        {!selectMode && <b className={styles.bookmarkMessage}>찜 장소를 길게 누르면 선택할 수 있습니다.</b>}
      </div>
      <section className={styles.profileBookmarkContainer}>
        {bookmarks.map((bookmark, index) => (
          <button
            onClick={() => {
              (selectMode && onChangeClickedBookmark(bookmark.id)) ||
                (!selectMode && router.push(`/pin/${bookmark.id}`));
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setIsButtonPressed(false)}
            key={index}
            className={`${styles.bookmarkContainer} ${clickedBookmarks.includes(bookmark.id) ? styles.bookmarkContainerClicked : ""}`}
          >
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
