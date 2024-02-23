import styles from "@/styles/components/_pincard.module.scss";
import { AddRoundIcon, LocationIcon, PinIcon } from "@/components/IconSvg";
import Pin from "@/types/Pin";

export default function PinCard({
  pinData,
  children,
}: {
  pinData: Pin;
  children?: React.ReactNode;
}) {
  return (
    <article className={styles.pinCard}>
      <div className={styles.mainInfo}>
        <PinIcon className={styles.pinIcon} />
        <button className={styles.title}>
          <h3>{pinData.placeName}</h3>
          <p>{pinData.category}</p>
        </button>
        <address>{pinData.address}</address>
        <div className={styles.tagContainer}>
          <span>맛집</span>
          <span>강릉</span>
          <span>로컬맛집</span>
        </div>
        <div className={styles.subContainer}>
          <button>
            {`내 컬렉션에 추가하기`}
            <AddRoundIcon />
          </button>
          <button>
            {`리뷰 더보기`}
            <AddRoundIcon />
          </button>
          <button>
            {`지도에서 보기`}
            <AddRoundIcon />
          </button>
        </div>
      </div>
      {children && <ul className={styles.commentList}>{children}</ul>}
    </article>
  );
}

export function LocationCard({
  // locationData,
  simple = false,
  placeName,
  category,
  roadNameAddress,
}: {
  // locationData: IPin;
  simple?: boolean;
  placeName: string;
  category: string;
  roadNameAddress: string;
}) {
  return (
    <article className={styles.locationCard}>
      <div className={styles.mainInfo}>
        <LocationIcon className={styles.pinIcon} />
        <button className={styles.title}>
          <h3>{placeName}</h3>
          <p>{category}</p>
        </button>
        <address>{roadNameAddress}</address>
        {!simple && (
          <div className={styles.subContainer}>
            <button>
              {`내 컬렉션에 추가하기`}
              <LocationIcon />
            </button>
            <button>
              {`지도에서 보기`}
              <LocationIcon />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
