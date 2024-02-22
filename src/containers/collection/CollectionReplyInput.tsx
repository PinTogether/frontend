"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/containers/collection/_collectionPage.module.scss";

export default function ReplyInputContent() {
  const size = 100;
  const myAvatar = "/images/cat_dummy.jpeg";
  const myNickname = "김고양";
  const [inputText, setInputText] = useState("");

  function onChange(e: any) {
    setInputText(e.target.value);
  }

  return (
    <section className={styles.replyInputContainer}>
      <Image
        src={myAvatar}
        alt="profile image"
        width={size}
        height={size}
        className={styles.replyAvatar}
      />
      <section className={styles.replyBox}>
        <div className={styles.replyName}>{myNickname}</div>
        <textarea
          className={styles.replyInput}
          onChange={onChange}
          maxLength={250}
          placeholder="댓글을 작성하세요"
        />
      </section>
      <section className={styles.replyInputButtonBox}>
        <button className={styles.replySendButton}>등록</button>
        <p className={styles.replyInputCounter}>{inputText.length}/250</p>
      </section>
    </section>
  );
}
