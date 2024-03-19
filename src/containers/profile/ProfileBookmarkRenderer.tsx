"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaceStarred } from "@/types/Place";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import placeDatas from "@/../../public/dummy-data/dummy-place.json";
import { SimplePlaceCard } from "@/components/PlaceCard";
import fetchGetStars from "@/utils/fetchGetStars";

export default function ProfileStarsRenderer({
  userId,
  className,
}: {
  userId: number;
  className?: string;
}) {
  /* fetch data */
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    starredDatas: PlaceStarred[];
    errorMessage: string;
  }>({
    starredDatas: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchGetStars(userId);
      setData(result);
      setIsLoading(false);
    };
    if (!isLoading) fetchData();
  }, [userId]);

  /* card click */
  const router = useRouter();
  // TODO "isButtonPressed" is not used
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
    <section className={`${styles.bookmarkOuterContainer} ${className}`}>
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
        {data.starredDatas.map((bookmark, index) => (
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
