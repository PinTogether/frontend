import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { DefaultCollectionCard } from "@/components/CollectionCard";
import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import fetchGetProfileCollections from "@/utils/fetchGetProfileCollections";

const ProfileCollectionsRenderer = ({
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
  const [data, setData] = useState<{
    collectionDatas: CollectionDetail[] | null;
    errorMessage: string;
  }>({
    collectionDatas: null,
    errorMessage: "",
  });

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
      if (isLoading) return;
      setIsLoading(true);
      const result = await fetchGetProfileCollections(userId, page, size);
      setData((prev) => {
        return {
          collectionDatas: [
            ...(prev.collectionDatas ?? []),
            ...result.collectionDatas,
          ],
          errorMessage: result.errorMessage,
        };
      });
      setPage((prev) => prev + 1);
      result.collectionDatas.length === 0 && setIsEnd(true);
      setIsLoading(false);
    };
    if (isIntersecting && !isEnd) fetchData();
  }, [userId, isIntersecting]);

  return (
    <section className={`${styles.profileListContainer} ${className}`}>
      {!data.collectionDatas ? (
        <p className={styles.errorMessage}>{data.errorMessage}</p>
      ) : (
        <>
          {data.collectionDatas.map((collection, index) => (
            <DefaultCollectionCard
              key={collection.id}
              collectionData={collection}
            />
          ))}
        </>
      )}
      <br />
      {!isEnd && <div ref={pageEndRef} style={{ height: "5px" }}></div>}
    </section>
  );
};
export default ProfileCollectionsRenderer;
