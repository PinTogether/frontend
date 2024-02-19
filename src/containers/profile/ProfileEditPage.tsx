"use client";

import Image from "next/image";
import styles from "@/styles/containers/profile/_profileEditPage.module.scss";
import { useState } from "react";
import { EditIcon, ImgLoadIcon, CloseRoundIcon } from "@/components/IconSvg";
import EditPageLayout, {
  H3Wrapper,
  Line,
  SectionWrapper,
} from "@/containers/layout/EditPageLayout";

export default function ProfileEditPage() {
  const size = 300;
  const [inputNickname, setInputNickname] = useState("");
  const [imgSrc, setImgSrc] = useState("/images/cat_dummy.jpeg");

  const onChangeNickname = (e: any) => {
    setInputNickname(e.target.value);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };

  const resetImgSrc = () => {
    setImgSrc("/images/cat_dummy.jpeg");
  };

  return (
    <EditPageLayout>
      <SectionWrapper>
        <H3Wrapper>
          <ImgLoadIcon />
          프로필 사진 변경
        </H3Wrapper>
        <div className={styles.avartarChangeContainer}>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <label htmlFor="file">
            <Image
              src={imgSrc}
              alt="profile image"
              className={styles.avartar}
              width={size}
              height={size}
            />
          </label>
          <button className={styles.cancelButton} onClick={resetImgSrc}>
            <CloseRoundIcon />
          </button>
        </div>
      </SectionWrapper>
      <Line />
      <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          닉네임 변경
        </H3Wrapper>
        <input
          className={styles.nicknameInput}
          onChange={onChangeNickname}
          value={inputNickname}
          placeholder="김고양"
        />
        <span className={styles.nicknameCheckMessage}>닉네임 중복 확인</span>
      </SectionWrapper>
      <Line />
      <SectionWrapper>
        <button className={styles.submitButton}>프로필 수정하기</button>
      </SectionWrapper>
    </EditPageLayout>
  );
}
