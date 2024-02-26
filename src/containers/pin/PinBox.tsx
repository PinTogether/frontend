import React, { useRef, useState, useEffect } from "react";
import styles from "@/styles/containers/pin/_pinBox.module.scss";
import {
  AddRoundIcon,
  CloseRoundIcon,
  CommentIcon,
  EditIcon,
} from "@/components/IconSvg";
import ImagePreviewBox from "@/containers/pin/ImagePreviewBox";
// import { LocationCard } from "@/components/PinCard";
import renderMultilineTextWithBreaks from "@/utils/renderMultilineTextWithBreaks";
import checkFileValid from "@/utils/checkFileValid";
import { NewPinData } from "./PinEditPage";

const PinBox = ({
  pinData,
  editPinData,
  handleDeletePin,
}: {
  pinData: NewPinData;
  editPinData: (newPinData: NewPinData) => void;
  handleDeletePin: () => void;
}) => {
  const pinReviewMaxLength = 1000;
  const pinReviewTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [textLength, setTextLength] = useState<number>(0);

  useEffect(() => {
    if (pinData.files) {
      const previews = pinData.files.map((file) => {
        return URL.createObjectURL(file);
      });
      setImagePreviews(previews);
    }
  }, []);

  const handleClickEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(imagePreviews);
    setEditMode((prev) => !prev);
    if (editMode) {
      const newPinData: NewPinData = {
        ...pinData,
        review: pinReviewTextareaRef.current?.value ?? "",
        files: pinData.files,
      };
      editPinData(newPinData);
    } else {
      pinReviewTextareaRef.current?.focus();
    }
  };

  //Dispatch<SetStateAction<File[]>>
  const setFiles = (newFiles: File[]) => {
    const newPinData: NewPinData = {
      ...pinData,
      review: pinData.review,
      files: newFiles,
    };
    editPinData(newPinData);
  };

  useEffect(() => {
    const handleInput = () => {
      setTextLength(pinReviewTextareaRef.current?.value.length || 0);
    };

    if (editMode && pinReviewTextareaRef.current) {
      pinReviewTextareaRef.current.focus();
      pinReviewTextareaRef.current.value = pinData.review || "";
      pinReviewTextareaRef.current.addEventListener("input", handleInput);
    }

    return () => {
      if (pinReviewTextareaRef.current)
        pinReviewTextareaRef.current.removeEventListener("input", handleInput);
    };
  }, [editMode]);

  return (
    <div
      className={styles.pinBox}
      // onSubmit={handleSubmit}
      // style={{ display: "none" }}
    >
      {/* <LocationCard
        placeName={pinData.name}
        category={pinData.category}
        roadNameAddress={pinData.address}
        simple={true}
      /> */}
      <button className={styles.deletePinButton} onClick={handleDeletePin}>
        <CloseRoundIcon />
      </button>
      {editMode ? (
        <>
          <button
            onClick={handleClickEdit}
            className={styles.clickedEditButton}
          >
            {/* 수정완료 */}
            <EditIcon />
          </button>
          <span
            className={styles.textLength}
          >{`${textLength}/${pinReviewMaxLength}`}</span>
          <textarea
            className={styles.reviewTextArea}
            placeholder="리뷰를 남겨주세요"
            rows={5}
            ref={pinReviewTextareaRef}
            maxLength={pinReviewMaxLength}
          />
          <ImageUploadBox
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
            files={pinData.files || []}
            setFiles={setFiles}
          />
        </>
      ) : (
        <>
          <button onClick={handleClickEdit} className={styles.editButton}>
            {/* 수정하기 */}
            <EditIcon />
          </button>
          {pinData.review && (
            <div className={styles.reviewTextArea}>
              <CommentIcon />
              <span>{renderMultilineTextWithBreaks(pinData.review)}</span>
            </div>
          )}
          {imagePreviews && <ImagePreviewBox imagePreviews={imagePreviews} />}
        </>
      )}
    </div>
  );
};
export default PinBox;

// Utils Image Box
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
