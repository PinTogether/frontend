"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import useGetMyProfile from "@/hooks/useGetMyProfile";

import fetchPostCollectionComments from "@/utils/fetchPostCollectionComment";
import AlertModal from "@/components/AlertModal";

import CollectionReply from "@/types/CollectionReply";

const ReplyInputContent = ({
  collectionId,
  getReplyDatas,
}: {
  collectionId: number;
  getReplyDatas: () => void;
}) => {
  const sizeImage = 100;

  const [inputText, setInputText] = useState("");
  const myProfile = useGetMyProfile();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onChange = (e: any) => {
    setInputText(e.target.value);
  };

  const getMyProfile = async () => {
    if (isProfileLoading) return;
    setIsProfileLoading(true);
    setIsProfileLoading(false);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isPosting || !myProfile) return;
    setIsPosting(true);

    const { success, errorMessage } = await fetchPostCollectionComments(
      collectionId,
      inputText
    );
    if (!success) {
      setAlertMessage(errorMessage);
      setIsPosting(false);
      return;
    } // TODO Api reply => CollectionReply
    getReplyDatas();
    setInputText("");
    setIsPosting(false);
    setAlertMessage("댓글이 등록되었습니다.");
  };

  return (
    <>
      {myProfile ? (
        <form className={styles.replyInputContainer} onSubmit={handleSubmit}>
          <Image
            src={myProfile?.avatar}
            alt="profile image"
            width={sizeImage}
            height={sizeImage}
            className={styles.replyAvatar}
          />
          <section className={styles.replyBox}>
            <textarea
              className={styles.replyTextArea}
              onChange={onChange}
              value={inputText}
              maxLength={200}
              rows={4}
              placeholder="댓글을 남겨주세요"
            />
          </section>
          <section className={styles.replyInputButtonBox}>
            <button className={styles.replySendButton}>등록</button>
            <p className={styles.replyInputCounter}>{inputText.length}/200</p>
          </section>
        </form>
      ) : (
        <div className={styles.replyInputContainer}>
          <p></p>
          <Link href="/login" className={styles.statusMessage}>
            댓글을 남기고 싶다면 로그인을 먼저 해주세요 🐾
          </Link>
        </div>
      )}
      <AlertModal message={alertMessage} setMessage={setAlertMessage} />
    </>
  );
};
export default ReplyInputContent;
