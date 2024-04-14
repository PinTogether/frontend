"use client";

import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import { ProfileFollower } from "@/types/Profile";
import BouncingLoader from "@/components/BouncingLoader";
import fetchGetSearchUser from "@/utils/search/fetchGetSearchUser";

import UserCard from "@/components/UserCard";

export default function SearchUserRender({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const pageNum = useRef(0);
  const pageEndDiv = useRef<HTMLDivElement>(null);
  const [userDatas, setUserDatas] = useState<ProfileFollower[]>([]);
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
      setUserDatas([]);
      setIsEnd(false);
      setIsLoading(false);
      setErrorMessage("");
    };
    resetSearch();
  }, [searchKeyword]);

  useEffect(() => {
    if (isIntersecting && !isLoading && !isEnd) {
      searchUser(searchKeyword);
    }
  }, [isIntersecting, searchKeyword, isEnd]);

  const searchUser = async (searchKeyword: string) => {
    const size = 10;
    const page = pageNum.current;

    if (isLoading || isEnd) return;
    setIsLoading(true);
    const { userDatas: newuserDatas, errorMessage } = await fetchGetSearchUser(
      searchKeyword,
      page,
      size
    );
    if (newuserDatas.length > 0) {
      setUserDatas((prev) => [...prev, ...newuserDatas]);
      pageNum.current += 1;
    } else {
      setErrorMessage(errorMessage);
      setIsEnd(true);
    }
    setIsLoading(false);
  };

  return (
    <section className={styles.searchListContainer}>
      {userDatas.length === 0 ? (
        isLoading ? (
          <BouncingLoader />
        ) : (
          <p className={styles.searchMessage}>{errorMessage}</p>
        )
      ) : (
        <>
          {userDatas.map((userData, index) => (
            <UserCard key={index} user={userData} showUnfollowButton={true} />
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
