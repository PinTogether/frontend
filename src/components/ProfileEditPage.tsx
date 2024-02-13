"use client"

import Image from "next/image";
import styles from "@/styles/layout/_profileEditPage.module.scss";
import Topper from "@/components/SubTopper";
import { useState } from "react";

export default function ProfileEditPage() {
  const size = 300;
  const [inputNickname, setInputNickname] = useState("");
  const [imgSrc, setImgSrc] = useState("/images/cat_dummy.jpeg");

  const onChangeNickname = (e: any) => {
    setInputNickname(e.target.value);
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if(typeof e.target?.result === "string"){
        setImgSrc(e.target?.result);
      }
    }
  }

  const resetImgSrc = () => {
    setImgSrc("/images/cat_dummy.jpeg");
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
        <div>
          <input
            type = "file"
            accept='image/jpg,image/png,image/jpeg'
            id = "file"
            style={{display: 'none'}}
            onChange={handleImage}
          />
          <label htmlFor='file'>
            <Image
              src={imgSrc}
              alt="profile image"
              className={styles.avartar}
              width={size}
              height={size}
            />
          </label>
        </div>
        <div className={styles.cancelButtonBox}>
          <button className={styles.cancelButton} onClick={resetImgSrc}>
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
