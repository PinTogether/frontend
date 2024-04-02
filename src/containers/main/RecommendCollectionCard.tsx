import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import styles from "@/styles/containers/main/_recommendCollectionCard.module.scss";
import { CollectionDetail } from "@/types/Collection";
import Pin from "@/types/Pin";
import CardSlider from "@/components/CardSlider";

const RecommendCollectionCard = ({
  collection,
  pinList,
}: {
  collection: CollectionDetail;
  pinList: Pin[];
}) => {
  const groupedPins = useMemo(() => {
    const grouped = [];
    for (let i = 0; i < pinList.length; i += 3) {
      grouped.push(pinList.slice(i, i + 3));
    }
    return grouped;
  }, [pinList]);

  return (
    <article className={styles.recommendCollectionCard}>
      <Link
        href={`/profile/${collection.writerMembername}`}
        className={styles.writerMembername}
      >
        {`@${collection.writerMembername}`}
      </Link>
      <Link
        href={`/collection/${collection.id}`}
        className={styles.collectionInfo}
      >
        <Image
          className={styles.thumbnail}
          src={collection.thumbnail}
          alt={collection.title}
          width={100}
          height={100}
        />
        <h2 className={styles.title}>{`${collection.title}`}</h2>
        <p className={styles.details}>{collection.details}</p>
      </Link>

      <section className={styles.cardsliderContainer}>
        <CardSlider>
          {groupedPins.map((group, idx) => (
            <div className={styles.cardlist} key={idx}>
              {group.map((pin) => (
                <HomeRecommendPinCard pinData={pin} key={pin.id} />
              ))}
            </div>
          ))}
        </CardSlider>
      </section>
    </article>
  );
};
export default RecommendCollectionCard;

const HomeRecommendPinCard = ({ pinData }: { pinData: Pin }) => {
  return (
    <Link
      href={`/place/${pinData.placeId}`}
      className={styles.homeRecommendPinCard}
    >
      <div className={styles.placeName}>{pinData.placeName}</div>
      <div className={styles.roadNameAddress}>{pinData.roadNameAddress}</div>
    </Link>
  );
};
