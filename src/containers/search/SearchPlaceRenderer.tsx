"use client";

import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import { PlaceDetail } from "@/types/Place";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import PlaceCard from "@/components/PlaceCard";
import BouncingLoader from "@/components/BouncingLoader";

export default function SearchPlaceRender({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [pageNum, setPageNum] = useState<number>(0);
  const pageEndDiv = useRef<HTMLDivElement>(null);
  const [placeDatas, setPlaceDatas] = useState<PlaceDetail[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const option = {
    root: null,
    rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
    threshold: 0.8, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  };
  const isIntersecting = useIntersectionObserver(pageEndDiv, option);

  useEffect(() => {
    setPlaceDatas([]);
    setPageNum(0);
    setIsEnd(false);
  }, [searchKeyword]);

  useEffect(() => {
    if (isIntersecting && !isLoading && !isEnd) {
      console.log("Intersect", pageNum);
      searchPlace(searchKeyword, pageNum);
    }
  }, [isIntersecting]);

  const searchPlace = (searchKeyword: string, page: number) => {
    const size = 10;
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/place?query=${searchKeyword}&page=${page + 1}&size=${size}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("검색에 실패했습니다.");
        return res.json();
      })
      .then((data) => {
        console.log(data, data.length);
        if (data.length > 0) setPageNum((prev) => prev + 1);
        setPlaceDatas((prev) => [...prev, ...data]);
        return data;
      })
      .then((data) => {
        if (placeDatas.length === 0) {
          setErrorMessage("검색 키워드에 맞는 장소가 없습니다.");
        } else {
          setErrorMessage("");
          setIsEnd(data.length < size);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("검색에 실패했습니다.");
        setIsLoading(false);
      });
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
      <div ref={pageEndDiv} style={{ height: "5px" }}></div>
      <br />
    </section>
  );
}
