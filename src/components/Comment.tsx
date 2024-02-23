import Image from "next/image";
import styles from "@/styles/components/_comment.module.scss";
// import PinReview from "@/types/PinReview";
import { PinForPlace } from "@/types/Pin";

export default function Comment({
  commentData,
  activeGoCollectionBtn = true,
}: {
  commentData: PinForPlace;
  activeGoCollectionBtn?: boolean;
}) {
  return (
    <article className={styles.comment}>
      <Image
        src="/images/cat_dummy.jpeg"
        alt="user profile image"
        width={100}
        height={100}
        className={styles.userAvatar}
      />
      <p className={styles.userNick}>{`${commentData.writer}님의 리뷰`}</p>
      <p className={styles.text}>{`${commentData.review}`}</p>
      <div className={styles.content}>
        <Image
          src="/images/food_dummy2.jpg"
          alt="user profile image"
          width={100}
          height={100}
        />
        <Image
          src="/images/food_dummy.jpg"
          alt="user profile image"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.buttons}>
        <br />
        <button className={styles.morePhoto}>+3 사진 더보기</button>
        {activeGoCollectionBtn && (
          <button className={styles.morePhoto}>
            {`"개포 맛집" 컬렉션 보러가기`}
          </button>
        )}
        <br />
      </div>
    </article>
  );
}
