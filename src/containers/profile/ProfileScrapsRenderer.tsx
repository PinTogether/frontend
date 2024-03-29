import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { DefaultCollectionCard } from "@/components/CollectionCard";
import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import fetchGetProfileScraps from "@/utils/members/fetchGetProfileScraps";

const ProfileScrapsCollectionRenderer = ({
  userId,
  isMyProfile,
  className,
}: {
  userId: number;
  isMyProfile: boolean;
  className?: string;
}) => {
  /* fetch data */
  const size = 27;
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [scrappedFetchData, setScrappedFetchData] = useState<{
    scrapDatas: CollectionDetail[];
    errorMessage: string;
  } | null>(null);

  /* infinite scroll */
  const pageEndRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);
  const option = {
    root: null,
    rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
    threshold: 0.8, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  };
  const isIntersecting = useIntersectionObserver(pageEndRef, option);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchGetProfileScraps(userId, page, size);
      setScrappedFetchData((prev) => {
        return {
          scrapDatas: [...(prev?.scrapDatas ?? []), ...result.scrapDatas],
          errorMessage: result.errorMessage,
        };
      });
      setPage((prev) => prev + 1);
      result.scrapDatas.length === 0 && setIsEnd(true);
      setIsLoading(false);
    };
    if (isIntersecting && !isLoading && !isEnd) fetchData();
  }, [userId, isIntersecting]);

  return (
    <section className={`${styles.profileListContainer} ${className}`}>
      {!scrappedFetchData ? (
        <p className={styles.errorMessage}>Loading</p>
      ) : !scrappedFetchData.scrapDatas.length ? (
        <p className={styles.errorMessage}>{scrappedFetchData.errorMessage}</p>
      ) : (
        scrappedFetchData.scrapDatas.map((collection) => (
          <DefaultCollectionCard
            key={collection.id}
            collectionData={collection}
          />
        ))
      )}
      <br />
      {!isEnd && <div ref={pageEndRef} style={{ height: "5px" }}></div>}
    </section>
  );
};
export default ProfileScrapsCollectionRenderer;
