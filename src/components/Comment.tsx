import Image from "next/image";
import styles from "@/styles/components/_comment.module.scss";

export interface IComment {
  id: number;
  userId: number;
  userNickname: string;
  comment: string;
  commentImages: object;
}

export default function Comment({
  commentData,
  activeGoCollectionBtn = true,
}: {
  commentData: IComment;
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
      <p
        className={styles.userNick}
      >{`${commentData.userNickname}님의 코멘트`}</p>
      <p className={styles.text}>{`${commentData.comment}`}</p>
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
      </div>
    </article>
  );
}
