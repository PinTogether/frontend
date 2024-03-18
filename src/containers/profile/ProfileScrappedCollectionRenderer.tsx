import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { DefaultCollectionCard } from "@/components/CollectionCard";
import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import APIResponse from "@/types/APIResponse";
import fetchGetProfileScrapCollection from "@/utils/fetchGetProfileScrapCollection";

const ProfileScrappedCollectionRenderer = ({
  // collectionList,
  userId,
  className,
}: {
  // collectionList: CollectionDetail[];
  userId: number;
  className?: string;
}) => {
  const pageEndDiv = useRef<HTMLDivElement>(null);
  // const { scrappedCollectionDatas, errorMessage } =
  //   await fetchGetProfileScrapCollection(userId);
  const [scrappedCollectionDatas, setScrappedCollectionDatas] = useState<
    CollectionDetail[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // const option = {
  //   root: null,
  //   rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
  //   threshold: 0.8, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  // };
  // const isIntersecting = useIntersectionObserver(pageEndDiv, option);

  // useEffect(() => {
  //   setScrappedCollectionDatas([]);
  //   setPageNum(0);
  //   setIsEnd(false);
  // }, []);

  // useEffect(() => {
  //   if (isIntersecting && !isLoading && !isEnd) {
  //     console.log("Intersect", pageNum);
  //     // getScrappedCollection();
  //   }
  // }, [isIntersecting]);

  return (
    <section className={`${styles.profileListContainer} ${className}`}>
      {!scrappedCollectionDatas.length
        ? `${errorMessage}`
        : scrappedCollectionDatas.map((collection) => (
            <DefaultCollectionCard
              key={collection.id}
              collectionData={collection}
            />
          ))}
      <br />
      <div ref={pageEndDiv} style={{ height: "5px" }}></div>
    </section>
  );
};
export default ProfileScrappedCollectionRenderer;
