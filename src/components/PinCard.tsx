import styles from "@/styles/components/_pincard.module.scss";
import { LinkIcon, PinIcon } from "@/components/Icons";
import Comment from "@/components/Comment";
import { IComment } from "@/components/Comment";

export interface IPinCard {
  id: number;
  serviceId: string;
  localCode: number;
  localManageCode: string;
  statusNumber: number;
  status: string;
  phone: string;
  zipCode: string;
  roadNumberAddress: string;
  roadNameAddress: string;
  roadZipCode: string;
  placeName: string;
  category: string;
  x: number;
  y: number;
  comment: string;
}

export default function PinCard({
  pinData,
  commentData,
  commentList,
}: {
  pinData: IPinCard;
  commentData?: IComment;
  commentList?: IComment[];
}) {
  return (
    <article className={styles.pinCard}>
      <div className={styles.mainInfo}>
        <PinIcon calssName={styles.pinIcon} />
        <button className={styles.title}>
          <h3>{pinData.placeName}</h3>
          <p>{pinData.category}</p>
        </button>
        <address>{pinData.roadNameAddress}</address>
        <div className={styles.buttons}>
          <button>
            {`컬렉션에 추가하기`}
            <LinkIcon />
          </button>
          <button>
            {`공유하기`}
            <LinkIcon />
          </button>
        </div>
      </div>

      {commentData && (
        <>
          <br />
          <Comment commentData={commentData} activeGoCollectionBtn={false} />
        </>
      )}
      {commentList && (
        <>
          <br />
          <ul className={styles.commentList}>
            {commentList.map((comment) => (
              <li key={comment.id}>
                <Comment commentData={comment} />
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
