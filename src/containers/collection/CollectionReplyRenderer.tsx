"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import CollectionReply from "@/types/CollectionReply";
import { CloseRoundIcon } from "@/components/IconSvg";
import ReplyInputContent from "./CollectionReplyInput";

import fetchDeleteCollectionComment from "@/utils/collections/fetchDeleteCollectionComment";
import AlertModal from "@/components/AlertModal";

const CollectionReplyRenderer = ({
  replys,
  getReplyDatas,
  errorMessage,
  collectionInfo,
  myId,
}: {
  replys: CollectionReply[];
  getReplyDatas: () => void;
  errorMessage: string;
  collectionInfo: CollectionDetail;
  myId?: number;
}) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [isDeleteReplyLoading, setIsDeleteReplyLoading] = useState(false);

  const deleteReply = async (replyId: number) => {
    if (isDeleteReplyLoading) return;
    setIsDeleteReplyLoading(true);
    const { success, errorMessage } =
      await fetchDeleteCollectionComment(replyId);
    if (!success) setAlertMessage(errorMessage);
    else {
      setAlertMessage("댓글이 삭제되었습니다.");
      getReplyDatas();
    }
    setIsDeleteReplyLoading(false);
    return;
  };

  return (
    <section className={styles.collectionReplyContainer}>
      <ReplyInputContent
        collectionId={collectionInfo.id}
        getReplyDatas={getReplyDatas}
      />
      {errorMessage ? (
        <div className={styles.errorMessage}>{errorMessage}</div>
      ) : (
        replys.map((reply) => (
          <ReplyContent
            key={reply.id}
            data={reply}
            isMyReply={myId === reply.writerId}
            onClickDeleteButton={deleteReply}
          />
        ))
      )}
      <AlertModal message={alertMessage} setMessage={setAlertMessage} />
    </section>
  );
};
export default CollectionReplyRenderer;

const ReplyContent = ({
  data,
  isMyReply,
  onClickDeleteButton,
}: {
  data: CollectionReply;
  isMyReply: boolean;
  onClickDeleteButton: (id: number) => void;
}) => {
  const sizeImage = 100;

  return (
    <section className={styles.replyContainer}>
      <Image
        src={data.writerAvatar}
        alt="profile image"
        width={sizeImage}
        height={sizeImage}
        className={styles.replyAvatar}
      />
      <section className={styles.replyBox}>
        <div className={styles.replyName}>{`@${data.writerMembername}`}</div>
        <div>
          <span className={styles.replyText}>{data.contents}</span>
          <span className={styles.replyCreatedAt}>
            {data.createdAt.slice(0, 10)}
          </span>
        </div>
      </section>

      {!isMyReply ? (
        <Link href="/report" className={styles.replyButton}>
          신고
        </Link>
      ) : (
        <button
          className={styles.replyButton}
          onClick={() => onClickDeleteButton(data.id)}
        >
          <CloseRoundIcon style={{ width: "20px", height: "20px" }} />
        </button>
      )}
    </section>
  );
};
