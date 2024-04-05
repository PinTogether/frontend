"use client";

import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import { PlaceDetail } from "@/types/Place";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import PlaceCard from "@/components/PlaceCard";
import BouncingLoader from "@/components/BouncingLoader";
import fetchGetSearchPlace from "@/utils/search/fetchGetSearchPlace";
import { RangeFilter } from "./SearchPage";
import { Filter } from "@/utils/search/fetchGetSearchPlace";

export default function SearchPlaceRender({
  searchKeyword,
  rangeFilter,
  setRangeFilterType,
}: {
  searchKeyword: string;
  rangeFilter: RangeFilter;
  setRangeFilterType: (rangeFilter: RangeFilter) => void;
}) {
  const pageNum = useRef(0);
  const pageEndDiv = useRef<HTMLDivElement>(null);
  const [placeDatas, setPlaceDatas] = useState<PlaceDetail[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  // const [rangeFilter, setRangeFilter] = useState(RangeFilter);

  const option = {
    root: null,
    rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
    threshold: 0.5, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  };
  const isIntersecting = useIntersectionObserver(pageEndDiv, option);

  useEffect(() => {
    const resetSearch = () => {
      pageNum.current = 0;
      setPlaceDatas([]);
      setIsEnd(false);
      setIsLoading(false);
      setErrorMessage("");
    };
    resetSearch();
  }, [searchKeyword, rangeFilter]);

  useEffect(() => {
    if (isIntersecting && !isLoading && !isEnd) {
      searchPlace(searchKeyword);
    }
  }, [isIntersecting, searchKeyword, isEnd]);

  const searchPlace = async (searchKeyword: string) => {
    const size = 10;
    const page = pageNum.current;
    // TODO : 현재 보고 있는 지도 좌표값 넣기
    const filter: Filter | null =
      rangeFilter === RangeFilter.ALL
        ? null
        : {
            leftBottomLatitude: 37.6484923,
            leftBottomLongitude: 127.0619026,
            rightTopLatitude: 37.6504923,
            rightTopLongitude: 127.0639026,
          };

    if (isLoading || isEnd) return;
    setIsLoading(true);
    const { placeDatas: newPlaceDatas, errorMessage } =
      await fetchGetSearchPlace(searchKeyword, page, size, filter);
    if (newPlaceDatas.length > 0) {
      setPlaceDatas((prev) => [...prev, ...newPlaceDatas]);
      pageNum.current += 1;
    } else {
      setErrorMessage(errorMessage);
      setIsEnd(true);
    }
    setIsLoading(false);
  };

  const onClickRangeFilter = (rangeFilter: RangeFilter) => {
    setRangeFilterType(rangeFilter);
  };

  return (
    <section className={styles.searchListContainer}>
      <div className={styles.rangeButtons}>
        {rangeFilter == RangeFilter.MAP ? (
          <>
            <button
              className={styles.active}
              onClick={() => onClickRangeFilter(RangeFilter.MAP)}
            >
              지도범위
            </button>
            <button
              className={styles.deactive}
              onClick={() => onClickRangeFilter(RangeFilter.ALL)}
            >
              전체
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.deactive}
              onClick={() => onClickRangeFilter(RangeFilter.MAP)}
            >
              지도범위
            </button>
            <button
              className={styles.active}
              onClick={() => onClickRangeFilter(RangeFilter.ALL)}
            >
              전체
            </button>
          </>
        )}
      </div>
      {placeDatas.length === 0 ? (
        isLoading ? (
          <BouncingLoader />
        ) : (
          <p className={styles.searchMessage}>{errorMessage}</p>
        )
      ) : (
        <>
          {placeDatas.map((data, index) => (
            <PlaceCard key={index} place={data} />
          ))}
          {isLoading && <BouncingLoader />}
        </>
      )}
      <br />
      <div
        ref={pageEndDiv}
        style={{ height: "5px", display: `${isEnd ? "none" : "block"}` }}
      ></div>
    </section>
  );
}
