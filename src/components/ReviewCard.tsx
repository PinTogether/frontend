import Image from "next/image";
import styles from "@/styles/components/_review.module.scss";
import Pin from "@/types/Pin";
import { CommentIcon } from "./IconSvg";
import Link from "next/link";

export { ReviewCard, MyReviewCard };

export default function ReviewCard({
  reviewData,
  activeGoCollectionBtn = true,
}: {
  reviewData: Pin;
  activeGoCollectionBtn?: boolean;
}) {
  const defaultAvatarUrl = process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL;

  return (
    <article className={styles.review}>
      <Link href={`/profile/${reviewData.writerId}`}>
        <Image
          src={reviewData.avatarImage || defaultAvatarUrl || ""} // avatar
          alt="user profile image"
          width={100}
          height={100}
          className={styles.userAvatar}
        />
      </Link>
      <Link href={`/profile/${reviewData.writerId}`}>
        <span
          className={styles.userNick}
        >{`@${reviewData.writerMembername}`}</span>
      </Link>
      <span className={styles.text}>{`${reviewData.review}`}</span>

      <div className={styles.content}>
        {reviewData.imagePaths.map((path, index) => (
          <Image
            key={index}
            src={path}
            alt="review image"
            width={100}
            height={100}
          />
        ))}
      </div>

      <li className={styles.tags}>
        {reviewData.tags.map((tag, index) => (
          <ul key={index} className={styles.tag}>{`${tag} `}</ul>
        ))}
      </li>

      <div className={styles.footers}>
        <br />
        <button
          className={styles.button}
        >{`+${reviewData.imagePaths.length} 사진 더보기`}</button>
        {activeGoCollectionBtn && (
          <Link
            className={styles.button}
            href={`/collection/${reviewData.collectionId}`}
          >
            {`"${reviewData.collectionTitle}" 컬렉션 보러가기`}
          </Link>
        )}
        <br />
      </div>
    </article>
  );
}

const MyReviewCard = ({ reviewData }: { reviewData: Pin }) => {
  return (
    <article className={styles.review}>
      {reviewData.review && (
        <div className={styles.text}>
          <CommentIcon />
          <span>{`${reviewData.review}`}</span>
        </div>
      )}
      {reviewData.imagePaths?.length > 0 && (
        <div className={styles.content}>
          {reviewData.imagePaths.map((path, index) => (
            <Image
              key={index}
              src={path}
              alt="review image"
              width={100}
              height={100}
            />
          ))}
        </div>
      )}
    </article>
  );
};
