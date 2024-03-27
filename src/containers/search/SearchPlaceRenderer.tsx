"use client";

import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import { PlaceDetail } from "@/types/Place";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import PlaceCard from "@/components/PlaceCard";
import BouncingLoader from "@/components/BouncingLoader";
import fetchGetSearchPlace from "@/utils/fetchGetSearchPlace";

export default function SearchPlaceRender({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const pageNum = useRef(0);
  const pageEndDiv = useRef<HTMLDivElement>(null);
  const [placeDatas, setPlaceDatas] = useState<PlaceDetail[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

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
  }, [searchKeyword]);

  useEffect(() => {
    if (isIntersecting && !isLoading && !isEnd) {
      searchPlace(searchKeyword);
    }
  }, [isIntersecting, searchKeyword, isEnd]);

  const searchPlace = async (searchKeyword: string) => {
    const size = 10;
    const page = pageNum.current;

    if (isLoading || isEnd) return;
    setIsLoading(true);
    const { placeDatas: newPlaceDatas, errorMessage } =
      await fetchGetSearchPlace(searchKeyword, page, size);
    if (newPlaceDatas.length > 0) {
      setPlaceDatas((prev) => [...prev, ...newPlaceDatas]);
      pageNum.current += 1;
    } else {
      setErrorMessage(errorMessage);
      setIsEnd(true);
    }
    setIsLoading(false);
  };

  return (
    <section className={styles.searchListContainer}>
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
