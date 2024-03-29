"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setMyProfile } from "@/redux/profileSlice";

import styles from "@/styles/containers/profile/_profileEditPage.module.scss";
import PresignedUrl from "@/types/PresingedUrl";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import EditPageLayout, {
  SectionTitle,
  Line,
  Section,
} from "@/containers/layout/EditPageLayout";
import { EditIcon, ImgLoadIcon, CloseRoundIcon } from "@/components/IconSvg";
import { InputComponent } from "@/components/InputComponent";
import { TextareaComponent } from "@/components/InputComponent";

import checkFileValid from "@/utils/checkFileValid";
import useGetMyProfile from "@/hooks/useGetMyProfile";
import fetchPutMyProfile from "@/utils/members/fetchPutMyProfile";
import fetchPostAvatarPresignedUrl from "@/utils/members/fetchPostAvatarPresignedUrl";
import fetchPutS3PresignedUrl from "@/utils/s3/fetchPutS3PresingedUrl";
import fetchGetMemberNameValid from "@/utils/members/fetchGetMemberNameValid";

export default function ProfileEditPage() {
  const imageSize = 300;
  const router = useRouter();
  const inputNameMaxLength = 16;
  const inputMembernameMaxLength = 30;
  const inputMembernameMinLength = 3;
  const inputMembernamePattern = /^[a-zA-Z0-9_]{3,30}$/;
  const inputBioMaxLength = 200;
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useAppDispatch();

  /* 프로필 변경전 정보 */
  const myProfile = useGetMyProfile();
  /* 프로필 변경후 정보 */
  const [inputName, setInputName] = useState("");
  const [inputMembername, setInputMembername] = useState("");
  const [inputBio, setInputBio] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  /* 에러 메시지 */
  const [imageFileCheckMessage, setImageFileCheckMessage] = useState("");
  const [nameCheckMessage, setNameCheckMessage] = useState("");
  const [membernameCheckMessage, setMembernameCheckMessage] = useState("");
  const [vaildMembername, setVaildMembername] = useState(false);
  const [totalErrorMessage, setTotalErrorMessage] = useState("");

  useEffect(() => {
    setImageSrc(myProfile?.avatar || "");
    setInputName(myProfile?.name || "");
    setInputMembername(myProfile?.membername || "");
    setInputBio(myProfile?.bio || "");
  }, [myProfile]);

  // 닉네임
  const handleChangeNickname = (e: any) => {
    setInputName(e.target.value);
  };
  const handleChangeMembername = (e: any) => {
    setInputMembername(e.target.value);
  };
  const handleChangeBio = (e: any) => {
    setInputBio(e.target.value);
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
    if (inputName === myProfile.name && !imageFile) {
      setNameCheckMessage("변경된 내용이 없습니다.");
      return;
    }
    if (!inputName || !inputMembername) {
      setNameCheckMessage("이름을 입력해주세요.");
      setMembernameCheckMessage("사용자 이름을 입력해주세요.");
      return;
    }
    setIsUploading(true);
    if (imageFile && checkFileValid(imageFile)) {
      const presignedUrlData = await getPresignedUrl(imageFile);
      if (!presignedUrlData) {
        setIsUploading(false);
        return;
      }
      const imageUrl = await uploadAvatar(imageFile, presignedUrlData);
      if (imageUrl === null) {
        setIsUploading(false);
        return;
      }
      setImageSrc(imageUrl);
      await uploadProfile(inputName, imageUrl);
      setIsUploading(false);
    } else {
      await uploadProfile(inputName, imageSrc);
      setIsUploading(false);
    }
  };

  // S3 업로드
  const getPresignedUrl = async (imageFile: File) => {
    const { presignedUrlData, errorMessage } =
      await fetchPostAvatarPresignedUrl(imageFile?.type);
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
      return null;
    }
    return presignedUrlData.imageUrl;
  };

  // 프로필 업로드
  const uploadProfile = async (inputName: string, imageFileUrl: string) => {
    if (!myProfile || isUploading) return;
    if (!vaildMembername) return;
    const { success, errorMessage } = await fetchPutMyProfile(
      inputName,
      inputMembername,
      inputBio,
      imageFileUrl
    );
    if (success) {
      updateReduxProfile();
      router.push(`/profile/${myProfile.id}`);
    } else setTotalErrorMessage(errorMessage);
  };

  const updateReduxProfile = async () => {
    if (!myProfile) return;
    const newProfile = {
      ...myProfile,
      nickname: inputName,
      avatar: imageSrc,
    };
    dispatch(setMyProfile(newProfile));
  };

  // 사용자 이름 유효성 검사
  const checkMembername = async (membername: string) => {
    setVaildMembername(false);
    if (!membername) {
      setMembernameCheckMessage("사용자 이름을 입력해주세요.");
      return false;
    }
    if (!inputMembernamePattern.test(membername)) {
      setMembernameCheckMessage(
        "3~30자의 영문, 숫자, _ 만 사용할 수 있습니다."
      );
      return false;
    }
    const { valid, errorMessage } = await fetchGetMemberNameValid(membername);
    if (!valid) {
      setMembernameCheckMessage(errorMessage);
      return false;
    }
    setVaildMembername(true);
    setMembernameCheckMessage("사용 가능한 사용자 이름입니다.");
    return true;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkMembername(inputMembername);
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputMembername]);

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
            프로필 사진
          </SectionTitle>
          <div className={styles.avartarChangeContainer}>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              id="file"
              style={{ display: "none" }}
              onChange={handleChangeAvatar}
              disabled={isUploading}
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
              disabled={isUploading}
            >
              <CloseRoundIcon />
            </button>
          </div>
          <span className={styles.checkMessage}>{imageFileCheckMessage}</span>
        </Section>
        <Line />
        {/* 이름 name */}
        <Section>
          <SectionTitle>
            <EditIcon />
            이름
          </SectionTitle>
          <InputComponent
            className={isUploading ? styles.disabled : ""}
            onChange={handleChangeNickname}
            value={inputName}
            placeholder={myProfile?.name}
            maxLength={inputNameMaxLength}
            // ref={(input) => input && input.focus()}
            disabled={isUploading}
          />
          <span className={styles.checkMessage}>{nameCheckMessage}</span>
        </Section>
        {/* 사용자 이름  membername */}
        <Section>
          <SectionTitle>
            <EditIcon />
            사용자 이름
          </SectionTitle>
          <InputComponent
            className={isUploading ? styles.disabled : ""}
            onChange={handleChangeMembername}
            value={inputMembername}
            placeholder={myProfile?.membername}
            maxLength={inputMembernameMaxLength}
            minLength={inputMembernameMinLength}
            disabled={isUploading}
          />
          <span
            className={`${vaildMembername ? styles.okMessage : styles.checkMessage}`}
          >
            {membernameCheckMessage}
          </span>
        </Section>
        {/* 소개 */}
        <Section>
          <SectionTitle>
            <EditIcon />
            소개
          </SectionTitle>
          <TextareaComponent
            className={isUploading ? styles.disabled : ""}
            rows={4}
            onChange={handleChangeBio}
            value={inputBio}
            placeholder={myProfile?.bio}
            maxLength={inputBioMaxLength}
            disabled={isUploading}
          />
        </Section>
        <Line />
        {/* 프로필 수정하기 버튼 */}
        <Section>
          <button
            className={styles.submitButton}
            onClick={submitEditProfile}
            disabled={isUploading}
          >
            프로필 수정하기
          </button>
          <span className={styles.checkMessage}>{totalErrorMessage}</span>
        </Section>
      </EditPageLayout>
    </SubPageLayout>
  );
}
