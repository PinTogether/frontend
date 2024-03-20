"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "@/styles/containers/profile/_profileEditPage.module.scss";
import { ProfileMine } from "@/types/Profile";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import EditPageLayout, {
  SectionTitle,
  Line,
  Section,
} from "@/containers/layout/EditPageLayout";
import { EditIcon, ImgLoadIcon, CloseRoundIcon } from "@/components/IconSvg";
import { InputComponent } from "@/components/InputComponent";

import checkFileValid from "@/utils/checkFileValid";
import getMyProfileFromLocalStorage from "@/utils/getMyProfileFromLocalStorage";
import fetchPutMyProfile from "@/utils/fetchPutMyProfile";
import fetchGetAvatarPresignedUrl from "@/utils/fetchGetAvatarPresignedUrl";
import PresignedUrl from "@/types/PresingedUrl";

export default function ProfileEditPage() {
  const imageSize = 300;
  const router = useRouter();
  const inputNicknameMaxLength = 16;
  const [isUploading, setIsUploading] = useState(false);
  
  /* 프로필 변경전 정보 */
  const [myProfile, setMyProfile] = useState<ProfileMine | null>(null);
  /* 프로필 변경후 정보 */
  const [inputNickname, setInputNickname] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  /* 에러 메시지 */
  const [imageFileCheckMessage, setImageFileCheckMessage] = useState("");
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState("");

  useEffect(() => {
    const myProfile = getMyProfileFromLocalStorage();
    setMyProfile(myProfile);
    if (myProfile) {
      setInputNickname(myProfile.nickname);
      setImageSrc(myProfile.avatar);
    }
  }, []);

  // 닉네임
  const handleChangeNickname = (e: any) => {
    setInputNickname(e.target.value);
  };

  // 프로필 사진
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
        setImageSrc(e.target?.result);
      }
    };
  };
  const handleClickResetAvatar = () => {
    setImageSrc(
      process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL || myProfile?.avatar || ""
    );
  };

  // 프로필 수정하기 제출
  const submitEditProfile = async () => {
    if (!myProfile || isUploading) return;
    if (inputNickname === myProfile.nickname && !imageFile) {
      setNicknameCheckMessage("변경된 내용이 없습니다.");
      return;
    }

    setIsUploading(true);
    if (imageFile && checkFileValid(imageFile)) {
      const presignedUrlData = await getPresignedUrl(imageFile);
      if (!presignedUrlData) return;
      if (!(await uploadAvatar(imageFile, presignedUrlData))) {
        setIsUploading(false);
        return;
      }
    }
    await uploadProfile(inputNickname, imageSrc);
    setIsUploading(false);
  };

  // 프로필, 이미지 업로드 관련 함수
  const getPresignedUrl = async (imageFile: File) => {
    const { presignedUrlData, errorMessage } = await fetchGetAvatarPresignedUrl(
      imageFile?.type
    );
    if (errorMessage || !presignedUrlData) {
      setImageFileCheckMessage(errorMessage);
      return null;
    }
    return presignedUrlData;
  };

  const uploadAvatar = async (
    imageFile: File,
    presignedUrlData: PresignedUrl
  ) => {
    const { success, errorMessage } = await fetchPutS3PresignedUrl(
      presignedUrlData.presignedUrl,
      imageFile
    );
    if (!success || errorMessage) {
      setImageFileCheckMessage(errorMessage);
      return false;
    }
    setImageSrc(presignedUrlData.imageUrl);
    return true;
  };

  const uploadProfile = async (inputNickname: string, imageFileUrl: string) => {
    if (!myProfile || isUploading) return;
    const { success, errorMessage } = await fetchPutMyProfile(
      inputNickname,
      imageFileUrl
    );
    if (success) router.push(`profile/${myProfile.id}`);
    else setNicknameCheckMessage(errorMessage);
  };

  return (
    <SubPageLayout
      topperMsg="내 정보 관리"
      completeButtonMsg="완료"
      onClickCompleteButton={submitEditProfile}
    >
      <EditPageLayout>
        <Section>
          {/* 프로필 사진 */}
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
                src={imageSrc}
                alt="profile image"
                className={`${styles.avartar} ${isUploading ? styles.disabled : ""}`}
                width={imageSize}
                height={imageSize}
              />
            </label>
            <button
              className={styles.cancelButton}
              onClick={handleClickResetAvatar}
            >
              <CloseRoundIcon />
            </button>
          </div>
          <span className={styles.nicknameCheckMessage}>
            {imageFileCheckMessage}
          </span>
        </Section>
        <Line />
        {/* 닉네임 */}
        <Section>
          <SectionTitle>
            <EditIcon />
            닉네임 변경
          </SectionTitle>
          <InputComponent
            className={isUploading ? styles.disabled : ""}
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
        {/* 프로필 수정하기 버튼 */}
        <Section>
          <button className={styles.submitButton} onClick={submitEditProfile}>
            프로필 수정하기
          </button>
        </Section>
      </EditPageLayout>
    </SubPageLayout>
  );
}
