import { CloseRoundIcon } from "@/components/IconSvg";
import styles from "@/styles/containers/pin/_imagePreviewBox.module.scss";
import Image from "next/image";
import { ReactNode, MouseEventHandler } from "react";
import { ImageData } from "./PinEditPage";

const ImagePreviewBox = ({
  imageFiles,
  children,
  handleClickClose,
}: {
  imageFiles: ImageData[];
  children?: ReactNode;
  handleClickClose?: (id: number) => void;
}) => {
  return (
    <div className={styles.imgPreviewBox}>
      {children}
      {imageFiles.length ? (
        imageFiles.map((imageFile) => (
          <div key={imageFile.id} className={styles.imgBox}>
            <Image
              src={imageFile.preview}
              alt="upload image preview"
              width={10}
              height={10}
            />
            {handleClickClose && (
              <CloseRoundIcon
                className={styles.closeIcon}
                onClick={() => handleClickClose(imageFile.id)}
              />
            )}
          </div>
        ))
      ) : (
        <>이미지를 업로드 해주세요</>
      )}
    </div>
  );
};

export default ImagePreviewBox;
