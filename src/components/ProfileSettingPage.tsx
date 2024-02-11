"use client"

import Image from "next/image";
import styles from "@/styles/layout/_profileSettingPage.module.scss";
import Topper from "@/components/SubTopper";
import { useState } from "react";

export default function ProfileSettingPage() {
  const size = 300;
  const [inputNickname, setInputNickname] = useState("");

  const onChangeNickname = (e: any) => {
    setInputNickname(e.target.value);
  }

  return (
    <section className={styles.container}>
      <Topper msg={"프로필 수정"} />
      <p className={styles.message}>
          프로필 사진 변경
      </p>
      <section className={styles.avartarChangeContainer}>
        <div>
        </div>
          <button>
            <Image
                src="/images/cat_dummy.jpeg"
                alt="profile image"
                className={styles.avartar}
                width={size}
                height={size}
              />
          </button>
        <div className={styles.cancelButtonBox}>
          <button className={styles.cancelButton}>
            X
          </button>
        </div>
      </section>
      <section className={styles.nicknameChangeContainer}>
        <p>
            닉네임 변경
        </p>
        <input className={styles.nicknameInput} onChange={onChangeNickname} value={inputNickname} placeholder="김고양"/>
        <p className={styles.nicknameCheckMessage}>
          닉네임 중복 확인
        </p>
      </section>
      <section className={styles.buttonContainer}>
        <button className={styles.confirmButton}>
          완료
        </button>
      </section>
    </section>
  );
}
