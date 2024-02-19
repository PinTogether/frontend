import ICollectionReply from "@/types/ICollectionReply";
import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Image from "next/image";

function ReplyContent({ data }: { data: ICollectionReply }) {
  const size = 100;
  //내 id와 작성자 id 비교해서 신고 또는 x, 수정 버튼 나오도록하기
  return (
    <section className={styles.replyContainer}>
      <Image
        src={data.userAvatar}
        alt="profile image"
        width={size}
        height={size}
        className={styles.replyAvatar}
      />
      <section className={styles.replyBox}>
        <div className={styles.replyName}>{data.userNickname}</div>
        <div>
          <span>{data.comment}</span>
          <span> </span>
          <span className={styles.replyName}>{data.createdAt.slice(0, 10)}</span>
        </div>
      </section>
      <button className={styles.replyButton}>신고</button>
    </section>
  );
}

export default function CollectionWithReply({
  replys,
}: {
  replys: ICollectionReply[];
}) {
  return (
    <section className={styles.collectionReplyContainer}>
      {replys.map((reply, index) => (
        <ReplyContent key={index} data={reply} />
      ))}
    </section>
  );
}
