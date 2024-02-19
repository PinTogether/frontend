import ICollectionReply from "@/types/ICollectionReply";
import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Image from "next/image";

function ReplyContent({ data }: { data: ICollectionReply }) {
  const size = 100;
  return (
    <div className={styles.replyContainer}>
      <Image
        src={data.userAvatar}
        alt="profile image"
        width={size}
        height={size}
        className={styles.replyAvatar}
      />
      <div className={styles.replyBox}>
        <p className={styles.replyName}>{data.userNickname}</p>
        <p>
          {data.comment} {data.createdAt.slice(0, 10)}
        </p>
      </div>
      <button className={styles.replyButton}>신고</button>
    </div>
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
