"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaceStarred } from "@/types/Place";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { PinIcon } from "@/components/IconSvg";
import placeDatas from "@/../../public/dummy-data/dummy-place.json";
import PlaceCard, { SimplePlaceCard } from "@/components/PlaceCard";

export default function ProfileBookmarkRenderer({
  bookmarks,
}: {
  bookmarks: PlaceStarred[];
}) {
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

  const onChangeClickedBookmark = (id: number) => {
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
              전체 취소
            </button>
          </>
        )}
        {!selectMode && (
          <b className={styles.bookmarkMessage}>
            찜 장소를 길게 누르면 선택할 수 있습니다.
          </b>
        )}
      </div>
      <section className={styles.profileBookmarkContainer}>
        {/*{placeDatas.map((bookmark, index) => (
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
            <SimplePlaceCard place={bookmark} />
          
          </button>
        ))}*/}
        {placeDatas.map((bookmark, index) => (
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
            <SimplePlaceCard place={bookmark} />
          </button>
        ))}
      </section>
    </section>
  );
}
