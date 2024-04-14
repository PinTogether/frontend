"use client";

import React, { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import { CollectionDetail } from "@/types/Collection";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import { HorizontalDetailCollectionCard } from "@/components/CollectionCard";
import BouncingLoader from "@/components/BouncingLoader";
import fetchGetSearchCollection from "@/utils/search/fetchGetSearchCollection";

const SearchCollectionRender = React.memo(
  ({ searchKeyword }: { searchKeyword: string }) => {
    const pageNum = useRef(0);
    const pageEndDiv = useRef<HTMLDivElement>(null);
    const [collectionDatas, setCollectionDatas] = useState<CollectionDetail[]>(
      []
    );
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
      const resetSearch = () => {
        pageNum.current = 0;
        setCollectionDatas([]);
        setIsEnd(false);
        setIsLoading(false);
        setErrorMessage("");
      };
      resetSearch();
    }, [searchKeyword]);

    useEffect(() => {
      if (isIntersecting && !isLoading && !isEnd) {
        searchCollection(searchKeyword);
      }
    }, [isIntersecting, searchKeyword, isEnd]);

    const searchCollection = async (searchKeyword: string) => {
      const size = 10;
      const page = pageNum.current;

      if (isLoading || isEnd) return;
      setIsLoading(true);
      const { collectionDatas: newCollectionDatas, errorMessage } =
        await fetchGetSearchCollection(searchKeyword, page, size);
      if (newCollectionDatas.length > 0) {
        setCollectionDatas((prev) => [...prev, ...newCollectionDatas]);
        pageNum.current += 1;
      } else {
        setErrorMessage(errorMessage);
        setIsEnd(true);
      }
      setIsLoading(false);
    };

    return (
      <section className={styles.searchListContainer}>
        {collectionDatas.length === 0 ? (
          isLoading ? (
            <BouncingLoader />
          ) : (
            <p className={styles.searchMessage}>{errorMessage}</p>
          )
        ) : (
          <>
            {collectionDatas.map((collectionData, index) => (
              <HorizontalDetailCollectionCard
                key={index}
                collectionData={collectionData}
              />
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
);
export default SearchCollectionRender;
