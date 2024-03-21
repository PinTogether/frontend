"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "@/styles/containers/collection/_collectionEditPage.module.scss";
import {
  ImgLoadIcon,
  EditIcon,
  CloseRoundIcon,
  PinIcon,
} from "@/components/IconSvg";
import EditPageLayout, {
  SectionTitle,
  Section,
  Line,
} from "@/containers/layout/EditPageLayout";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { InputComponent, TextareaComponent } from "@/components/InputComponent";
import { SimplePinCard } from "@/components/PinCard";
import TagEditor from "@/components/TagEditor";
import AlertModal from "@/components/AlertModal";

import pinDataList from "@/../../public/dummy-data/dummy-pin.json";

import fetchPostCollection from "@/utils/fetchPostCollection";
import fetchGetCollectionPresignedUrl from "@/utils/fetchGetCollectionPresignedUrl";
import fetchPutCollection from "@/utils/fetchPutCollection";
import fetchPutS3PresignedUrl from "@/utils/fetchPutS3PresingedUrl";
import fetchGetCollectionInfo from "@/utils/fetchGetCollectionInfo";

export default function CollectionEditPage({
  collectionId,
  topperMsg,
}: {
  collectionId?: number;
  topperMsg: string;
}) {
  const sizeImage = 300;
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  /* 컬렉션 정보 */
  const [inputTitle, setInputTitle] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_COLLECTION_URL || ""
  );
  const [tagList, setTagList] = useState<string[]>([]);

  const onChangeNickname = (e: any) => {
    setInputTitle(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setInputDetails(e.target.value);
  };

  const onChageImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };

  const resetImgSrc = () => {
    setImgSrc("https://picsum.photos/id/326/300");
  };

  /* 핀 리스트 */
  const [selectedPin, setSelectedPin] = useState<number[]>([]);
  const onClickPin = (index: number) => {
    if (selectedPin.includes(index)) {
      const newSelectedPin = selectedPin.filter((i) => i !== index);
      setSelectedPin(newSelectedPin);
    } else {
      const newSelectedPin = [...selectedPin, index];
      setSelectedPin(newSelectedPin);
    }
  };

  /* submit */
  const submitCollectionEdit = async () => {
    console.log("submit");
    setIsUploading(true);
    if (inputTitle === "") {
      setAlertMessage("컬렉션 제목을 입력해주세요.");
      return;
    }
    if (!collectionId) {
      await createCollection();
    } else {
      await editCollection(collectionId);
    }
    setIsUploading(false);
  };

  const createCollection = async () => {
    // 컬렉션 생성
    const { presingedUrlData, newCollectionId, errorMessage } =
      await fetchPostCollection(
        inputTitle,
        imgFile ? imgSrc : "",
        inputDetails,
        tagList,
        imgFile?.type || ""
      );
    if (errorMessage || (imgFile && !presingedUrlData)) {
      setAlertMessage(errorMessage);
      return;
    }
    // S3 이미지 업로드
    else if (imgFile && presingedUrlData) {
      const { success, errorMessage } = await fetchPutS3PresignedUrl(
        presingedUrlData.presignedUrl,
        imgFile
      );
      if (!success) {
        setAlertMessage(errorMessage);
        return;
      } else if (newCollectionId)
        router.push(`/collection/${presingedUrlData.id}`);
      // else setAlertMessage("컬렉션 이미지 업로드에 실패했습니다.");
    } else {
      // 이미지 없이 컬렉션 생성 성공
      if (newCollectionId) router.push(`/collection/${newCollectionId}`);
      else setAlertMessage("컬렉션 생성에 실패했습니다.");
    }
  };

  const editCollection = async (collectionId: number) => {
    // imgFile이 있으면 S3에 이미지 업로드
    if (imgFile) {
      // presinged URL 발급
      const { presignedUrlData, errorMessage: errorMessage1 } =
        await fetchGetCollectionPresignedUrl(collectionId, imgFile.type);
      if (errorMessage1 || !presignedUrlData) {
        setAlertMessage(errorMessage1);
        return;
      }
      //  S3 이미지 업로드
      const { success, errorMessage: errorMessage2 } =
        await fetchPutS3PresignedUrl(presignedUrlData.presignedUrl, imgFile);
      if (!success) {
        setAlertMessage(errorMessage2);
        return;
      }
      setImgSrc(presignedUrlData.imageUrl);
    }
    // 컬렉션 수정
    const { success, errorMessage } = await fetchPutCollection(
      inputTitle,
      imgSrc,
      inputDetails,
      tagList
    );
    if (!success) {
      setAlertMessage(errorMessage);
      return;
    }
  };

  /* 컬렉션 정보 불러오기 */
  const getAndSetCollectionInfo = async (collectionId: number) => {
    setIsUploading(true);
    const { collectionInfo, errorMessage } =
      await fetchGetCollectionInfo(collectionId);
    if (!collectionInfo || errorMessage) {
      setAlertMessage(errorMessage);
      setIsUploading(false);
      return;
    }
    setInputTitle(collectionInfo.title);
    setInputDetails(collectionInfo.details);
    setImgSrc(collectionInfo.thumbnail);
    setTagList(collectionInfo.tags);
    setIsUploading(false);
  };
  //

  useEffect(() => {
    if (collectionId) {
      getAndSetCollectionInfo(collectionId);
    }
  }, [collectionId]);

  return (
    <SubPageLayout
      topperMsg={topperMsg}
      completeButtonMsg={collectionId ? "완료" : "완료"}
      onClickCompleteButton={submitCollectionEdit}
    >
      <EditPageLayout>
        {/* 컬렉션 이미지 */}
        <Section>
          <SectionTitle>
            <ImgLoadIcon />
            컬렉션 대표 이미지
          </SectionTitle>
          <section className={styles.collectionChangeContainer}>
            <div className={styles.mainImage}>
              <InputComponent
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                id="file"
                style={{ display: "none" }}
                onChange={onChageImage}
              />
              <label htmlFor="file">
                <Image
                  src={imgSrc}
                  alt="profile image"
                  width={sizeImage}
                  height={sizeImage}
                />
              </label>
            </div>
            <div className={styles.cancelButtonBox}>
              <button className={styles.cancelButton} onClick={resetImgSrc}>
                <CloseRoundIcon />
              </button>
            </div>
          </section>
        </Section>
        <Line />

        <Section>
          {/* 컬렉션 제목 */}
          <SectionTitle>
            <EditIcon />
            <p>컬렉션 제목</p>
          </SectionTitle>
          <InputComponent
            onChange={onChangeNickname}
            value={inputTitle}
            maxLength={15}
            placeholder="제목을 입력해주세요"
          />
          <Line />
          {/* 컬렉션 태그 */}
          <SectionTitle>
            <EditIcon />
            <p>컬렉션 태그</p>
          </SectionTitle>
          <TagEditor tagList={tagList} setTagList={setTagList} />
          <Line />
          {/* 컬렉션 설명 */}
          <SectionTitle>
            <EditIcon />
            컬렉션 설명
          </SectionTitle>
          <TextareaComponent
            rows={6}
            onChange={onChangeDescription}
            value={inputDetails}
            maxLength={250}
            placeholder="컬렉션 설명을 입력해주세요"
          />
          <Line />
        </Section>
        {/* 핀 리스트 */}
        {collectionId && (
          <Section>
            <SectionTitle className={styles.titleContainer}>
              <PinIcon />
              <span>핀 리스트</span>
              <Link
                href={`/pin/select?collectionId=${collectionId}`}
                className={styles.pinAddButton}
              >
                {"핀 추가하기 >"}
              </Link>
            </SectionTitle>
            {/* List */}
            <ul className={styles.pinCardContainer}>
              {pinDataList.map((pin) => (
                <div key={pin.id} className={styles.pinCard}>
                  <SimplePinCard
                    pinData={pin}
                    showEditButton={false}
                    activeShowDetail={true}
                  />
                  <Link href={`/pin/edit/${pin.id}`}>
                    <EditIcon className={styles.editButton} />
                  </Link>
                  <CloseRoundIcon className={styles.closeButton} />
                </div>
              ))}
            </ul>
            <Line />
          </Section>
        )}
        {/* <Section className={styles.buttonContainer}>
          {id && <button className={styles.confirmButton}>수정 완료</button>}
          {!id && <button className={styles.confirmButton}>생성 완료</button>}
        </Section> */}
        <AlertModal message={alertMessage} setMessage={setAlertMessage} />
      </EditPageLayout>
    </SubPageLayout>
  );
}
