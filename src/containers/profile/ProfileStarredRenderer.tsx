"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { PlaceStarred } from "@/types/Place";
import { SimplePlaceCard } from "@/components/PlaceCard";

import fetchGetStars from "@/utils/fetchGetStars";
import fetchDeleteStarPlace from "@/utils/fetchDeleteStarPlace";

export default function ProfileStarredRenderer({
  userId,
  className,
}: {
  userId: number;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  /* fetch data */
  const [isLoading, setIsLoading] = useState(false);
  const [starredFetchData, setStarredFetchData] = useState<{
    starredDatas: PlaceStarred[];
    errorMessage: string;
  } | null>(null);

  const fetchStarsData = async () => {
    setIsLoading(true);
    const result = await fetchGetStars(userId);
    setStarredFetchData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) fetchStarsData();
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

  /* delete stars */
  const handleDeleteStarred = async () => {
    if (clickedBookmarks.length === 0) return;
    // TODO Implement delete starred
    console.log("delete starred", clickedBookmarks);

    clickedBookmarks.forEach(async (id) => {
      const { success, errorMessage } = await fetchDeleteStarPlace(id);
      if (!success) dispatch(addAlertMessage(errorMessage));
    });
    fetchStarsData();
  };

  const handleAddToCollection = async () => {
    if (clickedBookmarks.length === 0) return;
    // TODO Implement add to collection
    console.log("add to collection", clickedBookmarks);
  };

  return (
    <section className={`${styles.bookmarkOuterContainer} ${className}`}>
      {!starredFetchData ? (
        <p className={styles.errorMessage}>Loading</p>
      ) : starredFetchData.errorMessage ? (
        <p className={styles.errorMessage}>{starredFetchData.errorMessage}</p>
      ) : (
        <>
          <div className={styles.bookmarkButtonContainer}>
            {selectMode && (
              <>
                <button
                  className={styles.bookmarkButton}
                  onClick={handleDeleteStarred}
                >
                  선택한 찜 삭제하기
                </button>
                {/* <button
                  className={styles.bookmarkButton}
                  onClick={handleAddToCollection}
                >
                  선택한 찜 컬렉션에 추가하기
                </button> */}
                <button
                  className={styles.bookmarkButton}
                  onClick={() => {
                    setSelectMode(false), setClickedBookmarks([]);
                  }}
                >
                  취소
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
            {starredFetchData.starredDatas.map((bookmark, index) => (
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
        </>
      )}
    </section>
  );
}
