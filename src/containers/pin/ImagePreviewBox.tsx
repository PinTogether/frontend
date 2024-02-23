import { CloseRoundIcon } from "@/components/IconSvg";
import styles from "@/styles/containers/pin/_imagePreviewBox.module.scss";
import Image from "next/image";
import { ReactNode, MouseEventHandler } from "react";

const ImagePreviewBox = ({
  imagePreviews,
  children,
  handleClickClose,
}: {
  imagePreviews: string[];
  children?: ReactNode;
  handleClickClose?: (index: number) => void;
}) => {
  return (
    <div className={styles.imgPreviewBox}>
      {children}
      {imagePreviews &&
        imagePreviews.map((previewUrl, index) => (
          <div key={index} className={styles.imgBox}>
            <Image
              key={index} // ?
              src={previewUrl}
              alt="upload image preview"
              // style={{ maxWidth: "100px", maxHeight: "100px", margin: "10px" }}
              width={10}
              height={10}
            />
            {handleClickClose && (
              <CloseRoundIcon
                className={styles.closeIcon}
                onClick={() => handleClickClose(index)}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default ImagePreviewBox;
