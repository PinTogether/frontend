"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { PlatformType } from "@/types/Report";
import CollectionReply from "@/types/CollectionReply";
import { CloseRoundIcon } from "@/components/IconSvg";
import AlertModal from "@/components/AlertModal";
import ReplyForm from "./ReplyForm";

import fetchDeleteCollectionComment from "@/utils/collections/fetchDeleteCollectionComment";
import fetchGetCollectionComments from "@/utils/collections/fetchGetCollectionComments";

const ReplyRenderer = ({
  collectionInfo,
  myId,
}: {
  collectionInfo: CollectionDetail;
  myId?: number;
}) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [isDeleteReplyLoading, setIsDeleteReplyLoading] = useState(false);
  const [replys, setReplys] = useState<CollectionReply[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("Loading...");

  const deleteReply = async (replyId: number) => {
    if (isDeleteReplyLoading) return;
    setIsDeleteReplyLoading(true);
    const { success, errorMessage } =
      await fetchDeleteCollectionComment(replyId);
    if (!success) setAlertMessage(errorMessage);
    else {
      setAlertMessage("댓글이 삭제되었습니다.");
      getReplys();
    }
    setIsDeleteReplyLoading(false);
    return;
  };

  const getReplys = async () => {
    const { replyList: updatedReplys, errorMessage } =
      await fetchGetCollectionComments(collectionInfo.id);
    setReplys(updatedReplys);
    setErrorMessage(errorMessage);
  };

  useEffect(() => {
    getReplys();
  }, []);

  return (
    <section className={styles.collectionReplyContainer}>
      <ReplyForm
        collectionId={collectionInfo.id}
        afterSuccessSubmit={getReplys}
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
export default ReplyRenderer;

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
        <div className={styles.textContainer}>
          <span className={styles.replyText}>{data.contents}</span>
          <span className={styles.replyCreatedAt}>{data.createdAt}</span>
        </div>
      </section>

      {!isMyReply ? (
        <Link
          href={`/report?type=${PlatformType.COLLECTION_COMMENT}&id=${data.id}`}
          className={styles.replyButton}
        >
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
