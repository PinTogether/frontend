"use client";

import styles from "@/styles/containers/profile/_profileEditPage.module.scss";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { EditIcon, ImgLoadIcon, CloseRoundIcon } from "@/components/IconSvg";
import EditPageLayout, {
  SectionTitle,
  Line,
  Section,
} from "@/containers/layout/EditPageLayout";
import { useRouter } from "next/navigation";

import getMyProfileFromLocalStorage from "@/utils/getMyProfileFromLocalStorage";
import { ProfileMine } from "@/types/Profile";
import checkFileValid from "@/utils/checkFileValid";
import fetchPutMyProfile from "@/utils/fetchPutMyProfile";
import { InputComponent } from "@/components/InputComponent";

export default function ProfileEditPage() {
  const imageSize = 300;
  const router = useRouter();
  const inputNicknameMaxLength = 16;
  /* 프로필 변경전 정보 */
  const [myProfile, setMyProfile] = useState<ProfileMine | null>(null);
  /* 프로필 변경후 정보 */
  const [inputNickname, setInputNickname] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  /* 에러 메시지 */
  const [imageFileCheckMessage, setImageFileCheckMessage] = useState("");
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState("");

  useEffect(() => {
    const myProfile = getMyProfileFromLocalStorage();
    setMyProfile(myProfile);
    if (myProfile) {
      setInputNickname(myProfile.nickname);
      setImgSrc(myProfile.avatar);
    }
  }, []);

  const handleChangeNickname = (e: any) => {
    setInputNickname(e.target.value);
  };

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!checkFileValid(file)) {
      setImageFileCheckMessage(
        "5MB 이하의 jpg, jpeg, png 파일을 업로드해주세요."
      );
      return;
    }
    setImageFile(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };

  const onClickResetAvatar = () => {
    setImgSrc(myProfile?.avatar || "");
  };

  const submitEditProfile = async () => {
    if (inputNickname === "") {
      setNicknameCheckMessage("닉네임을 입력해주세요.");
      return;
    }
    if (inputNickname === myProfile?.nickname && imageFile === null) {
      return;
    }

    // TODO : 프로필 avatar 변경 시, presigned url 받아서 s3에 업로드
    const imageFileUrl = undefined;

    const fetch = async () => {
      if (!myProfile) return;
      const success = await fetchPutMyProfile(inputNickname, imageFileUrl);
      if (success) {
        router.push(`profile/${myProfile.id}`);
      } else {
        // TODO : 에러 메시지 표시
        setNicknameCheckMessage("프로필 수정에 실패했습니다.");
      }
    };
    fetch();
  };

  return (
    <SubPageLayout
      topperMsg="내 정보 관리"
      completeButtonMsg="완료"
      onClickCompleteButton={submitEditProfile}
    >
      <EditPageLayout>
        <Section>
          <SectionTitle>
            <ImgLoadIcon />
            프로필 사진 변경
          </SectionTitle>
          <div className={styles.avartarChangeContainer}>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              id="file"
              style={{ display: "none" }}
              onChange={handleChangeAvatar}
            />
            <label htmlFor="file">
              <Image
                src={imgSrc}
                alt="profile image"
                className={styles.avartar}
                width={imageSize}
                height={imageSize}
              />
            </label>
            <button
              className={styles.cancelButton}
              onClick={onClickResetAvatar}
            >
              <CloseRoundIcon />
            </button>
          </div>
          <span className={styles.nicknameCheckMessage}>
            {imageFileCheckMessage}
          </span>
        </Section>
        <Line />
        <Section>
          <SectionTitle>
            <EditIcon />
            닉네임 변경
          </SectionTitle>
          <InputComponent
            onChange={handleChangeNickname}
            value={inputNickname}
            placeholder="김고양"
            maxLength={inputNicknameMaxLength}
            ref={(input) => input && input.focus()}
          />
          <span className={styles.nicknameCheckMessage}>
            {nicknameCheckMessage}
          </span>
        </Section>
        <Line />
        <Section>
          <button className={styles.submitButton} onClick={submitEditProfile}>
            프로필 수정하기
          </button>
        </Section>
      </EditPageLayout>
    </SubPageLayout>
  );
}
