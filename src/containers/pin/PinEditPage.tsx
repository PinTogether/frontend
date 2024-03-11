"use client";

import { useEffect, useState, useRef } from "react";
import EditPageLayout, {
  SectionTitle,
  Section,
  Line,
} from "../layout/EditPageLayout";
import styles from "@/styles/containers/pin/_pinEditPage.module.scss";
import { EditIcon, ImgLoadIcon, PinIcon } from "@/components/IconSvg";
import ImagePreviewBox from "./ImagePreviewBox";
import { TextareaComponent } from "@/components/InputComponent";
import { AddRoundIcon } from "@/components/IconSvg";
import checkFileValid from "@/utils/checkFileValid";
import { SimplePinCard } from "@/components/PinCard";
import TagEditor from "@/components/TagEditor";

import pinDataList from "@/../../public/dummy-data/dummy-pin.json";
import SubPageLayout from "@/containers/layout/SubPageLayout";

interface Place {
  id: number;
  address: string;
  name: string;
  category: string;
  created_at: string;
}

export interface NewPinData extends Place {
  review?: string;
  files?: File[];
}

export default function PinEditPage({ pinId }: { pinId?: string }) {
  const [review, setReview] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    // setReview(textareaRef.current?.value ?? "");
    console.log(textareaRef.current?.value, files);
  };

  return (
    <SubPageLayout
      topperMsg={pinId ? "핀 수정하기" : "핀 추가하기"}
      completeButtonMsg={pinId ? "수정완료" : "추가완료"}
      onClickCompleteButton={handleSubmit}
    >
      <EditPageLayout>
        {/* Place 정보 */}
        <Section>
          <SectionTitle>
            <PinIcon />
            {pinDataList[0].placeName}
          </SectionTitle>
          <SimplePinCard pinData={pinDataList[0]} showEditButton={false} />
          {pinId && (
            <div className={styles.deleteButton}>
              <button>핀 삭제하기</button>
            </div>
          )}
          <Line />
        </Section>
        <Section>
          {/* 핀 리뷰 */}
          <SectionTitle>
            <EditIcon />핀 리뷰
          </SectionTitle>
          <TextareaComponent maxLength={1000} rows={10} ref={textareaRef} />
          <Line />

          {/* 이미지 업로드 */}
          <SectionTitle>
            <ImgLoadIcon />
            이미지 업로드
          </SectionTitle>
          <ImageUploadBox
            imagePreviews={files.map((file) => URL.createObjectURL(file))}
            setImagePreviews={setImagePreviews}
            files={files}
            setFiles={setFiles}
          />
          <Line />
          {/* 핀 태그 */}
          <SectionTitle>
            <EditIcon />핀 태그
          </SectionTitle>
          <TagEditor tagList={tagList} setTagList={setTagList} />
          {/* <InputComponent maxLength={10} /> */}
          <Line />
        </Section>
        <Section>
          <button className={styles.submitButton} onClick={handleSubmit}>
            {pinId ? "수정완료" : "추가완료"}
          </button>
        </Section>
      </EditPageLayout>
    </SubPageLayout>
  );
}

const ImageUploadBox = ({
  imagePreviews,
  setImagePreviews,
  files,
  setFiles,
}: {
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  files: File[];
  setFiles: (newFiles: File[]) => void;
}) => {
  const imageUploadMax = 5;
  const [errMsg, setErrMsg] = useState("");

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const newFiles = Array.from(e.target.files ?? []).filter((file) => {
      if (checkFileValid(file)) return true;
      setErrMsg("유효하지 않은 파일 형식입니다.");
    });
    if (newFiles.length + files.length > imageUploadMax) {
      setErrMsg("이미지는 5개까지 업로드 가능합니다.");
      return;
    }
    const previews = [...newFiles, ...files].map((file) => {
      return URL.createObjectURL(file);
    });
    setFiles([...newFiles, ...files]);
    setImagePreviews(previews);
  };

  const handleDeleteImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    const previews = newFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreviews(previews);
  };

  return (
    <div className={styles.imageUploadBox}>
      <input
        type="file"
        id="img-upload"
        accept="image/jpg, image/jpeg, image/png"
        className={styles.inputFile}
        onChange={handleChangeImage}
        multiple
      />
      <ImagePreviewBox
        imagePreviews={imagePreviews}
        handleClickClose={handleDeleteImage}
      >
        <label htmlFor="img-upload" className={styles.inputLabel}>
          <AddRoundIcon />
        </label>
      </ImagePreviewBox>
      {files && (
        <span className={styles.selectedImgNum}> {`${files.length}/5`}</span>
      )}
      {errMsg && <span className={styles.errMsg}>{errMsg}</span>}
    </div>
  );
};
