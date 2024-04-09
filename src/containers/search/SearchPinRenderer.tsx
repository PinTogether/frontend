"use client";

import Pin from "@/types/Pin";
import PinCard from "@/components/PinCard";

import { useAppSelector } from "@/redux/hooks";
import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import PlaceCard from "@/components/PlaceCard";
import BouncingLoader from "@/components/BouncingLoader";
import fetchGetSearchPin from "@/utils/search/fetchGetSearchPin";

import { RangeFilter } from "./SearchPage";
import { SearchRangeFilter } from "@/types/SearchRangeFilter";

export default function SearchPinRender({
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
  const [pinDatas, setPinDatas] = useState<Pin[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const mapNESW = useAppSelector((state) => state.location.mapNESW);

  const option = {
    root: null,
    rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
    threshold: 0.5, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  };
  const isIntersecting = useIntersectionObserver(pageEndDiv, option);

  useEffect(() => {
    const resetSearch = () => {
      pageNum.current = 0;
      setPinDatas([]);
      setIsEnd(false);
      setIsLoading(false);
      setErrorMessage("");
    };
    resetSearch();
  }, [searchKeyword, rangeFilter]);

  useEffect(() => {
    if (isIntersecting && !isLoading && !isEnd) {
      searchPin(searchKeyword);
    }
  }, [isIntersecting, searchKeyword, isEnd]);

  const searchPin = async (searchKeyword: string) => {
    const size = 10;
    const page = pageNum.current;
    // TODO : 현재 보고 있는 지도 좌표값 넣기
    const filter: SearchRangeFilter | null =
      rangeFilter === RangeFilter.ALL
        ? null
        : {
            leftBottomLatitude: mapNESW[2],
            leftBottomLongitude: mapNESW[3],
            rightTopLatitude: mapNESW[0],
            rightTopLongitude: mapNESW[1],
          };

    if (isLoading || isEnd) return;
    setIsLoading(true);
    const { pinDatas: newPinDatas, errorMessage } = await fetchGetSearchPin(
      searchKeyword,
      page,
      size,
      filter
    );
    if (newPinDatas.length > 0) {
      setPinDatas((prev) => [...prev, ...newPinDatas]);
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
      {pinDatas.length === 0 ? (
        isLoading ? (
          <BouncingLoader />
        ) : (
          <p className={styles.searchMessage}>{errorMessage}</p>
        )
      ) : (
        <>
          {pinDatas.map((data, index) => (
            <PinCard pinData={data} key={index} showCollectionTitle={true} />
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
