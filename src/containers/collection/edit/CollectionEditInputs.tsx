"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectDraftCollectionEdit,
  updateTitle,
  updateDetails,
  updateTagList,
  updateImgFile,
  updateImgSrc,
} from "@/redux/draftCollectionEditSlice";

import styles from "@/styles/containers/collection/_collectionEditPage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { ImgLoadIcon, EditIcon, CloseRoundIcon } from "@/components/IconSvg";
import { SectionTitle, Section, Line } from "@/containers/layout/EditPageLayout";
import { InputComponent, TextareaComponent } from "@/components/InputComponent";
import TagEditor from "@/components/TagEditor";

export default function EditInputs({
  collectionInfo,
  isUploading,
}: {
  collectionInfo?: CollectionDetail;
  isUploading: boolean;
}) {
  const imageSize = 300;
  const dispatch = useAppDispatch();

  /* 컬렉션 수정중인 정보 */
  const { id, title, details, tagList, imgFile, imgSrc } = useAppSelector(selectDraftCollectionEdit) || {};

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateDetails(e.target.value));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTagList(e.target.value.split(",").map(tag => tag.trim())));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch(updateImgFile(file));
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = e => {
      if (typeof e.target?.result === "string") {
        dispatch(updateImgSrc(e.target?.result));
      }
    };
  };

  const handleResetBtnClick = () => {
    dispatch(updateImgSrc(process.env.NEXT_PUBLIC_DEFAULT_COLLECTION_URL || ""));
  };

  return (
    <>
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
              onChange={handleImageChange}
              disabled={isUploading}
            />
            <label htmlFor="file">
              <Image src={imgSrc || ""} alt="profile image" width={imageSize} height={imageSize} />
            </label>
          </div>
          <div className={styles.cancelButtonBox}>
            <button className={styles.cancelButton} onClick={handleResetBtnClick} disabled={isUploading}>
              <CloseRoundIcon />
            </button>
          </div>
        </section>
      </Section>
      <Line />
      <Section>
        <SectionTitle>
          <EditIcon />
          <p>컬렉션 제목</p>
        </SectionTitle>
        <InputComponent
          onChange={handleTitleChange}
          value={title}
          maxLength={15}
          placeholder={collectionInfo?.title || "제목을 입력해주세요"}
          disabled={isUploading}
        />
        <Line />
        <SectionTitle>
          <EditIcon />
          <p>컬렉션 태그</p>
        </SectionTitle>
        <TagEditor tagList={tagList || []} setTagList={() => handleTagsChange} disabled={isUploading} />
        <Line />
        <SectionTitle>
          <EditIcon />
          <p>컬렉션 설명</p>
        </SectionTitle>
        <TextareaComponent
          rows={6}
          onChange={handleDetailsChange}
          value={details}
          maxLength={250}
          placeholder={collectionInfo?.details || "설명을 입력해주세요"}
          disabled={isUploading}
        />
        <Line />
      </Section>
    </>
  );
}
