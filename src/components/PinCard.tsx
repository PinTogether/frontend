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
          <span>{pinData.category}</span>
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
      <ul className={styles.commentList}>
        <li></li>
      </ul>
      {/* {children && <ul className={styles.commentList}>{children}</ul>} */}
    </article>
  );
}
