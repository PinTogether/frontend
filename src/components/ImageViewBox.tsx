import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import styles from "@/styles/components/_imageViewBox.module.scss";
import { CloseRoundIcon, ExpandLeftIcon, ExpandRightIcon } from "./IconSvg";

const ImageViewBox = ({
  review,
  membername,
  imagePaths,
  selectedImageNum,
  setSelectedImageNum,
}: {
  review: string;
  membername: string;
  imagePaths: string[];
  selectedImageNum: number | null;
  setSelectedImageNum: Dispatch<SetStateAction<number | null>>;
}) => {
  const [currentImagePath, setCurrentImagePath] = useState<number | null>(
    selectedImageNum
  );

  const handleClickCloseButton = () => {
    setCurrentImagePath(null);
    setSelectedImageNum(null);
  };

  const handleClickButton = (increment: number) => {
    if (currentImagePath === null) return;
    const newImagePath = currentImagePath + increment;
    if (newImagePath >= 0 && newImagePath < imagePaths.length) {
      setCurrentImagePath(newImagePath);
    }
  };

  useEffect(() => {
    setCurrentImagePath(selectedImageNum);
  }, [selectedImageNum]);

  if (imagePaths.length <= 0 || currentImagePath === null) return <></>;
  return (
    <section className={styles.imageViewBox}>
      <article className={styles.imageViewContainer}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={imagePaths[currentImagePath]}
            width={700}
            height={700}
            alt={"review iamge"}
          />
          {currentImagePath !== 0 && (
            <ExpandLeftIcon
              className={styles.leftButton}
              onClick={() => handleClickButton(-1)}
            />
          )}
          {currentImagePath !== imagePaths.length - 1 && (
            <ExpandRightIcon
              className={styles.rightButton}
              onClick={() => handleClickButton(1)}
            />
          )}
        </div>
        <div className={styles.reviewContainer}>
          <Link href={`/profile/${membername}`}>
            <h3 className={styles.membername}>{`@${membername}의 리뷰`}</h3>
          </Link>
          <span className={styles.review}>{review}</span>
        </div>
      </article>
      <CloseRoundIcon
        id={styles.closeButton}
        onClick={handleClickCloseButton}
      />
    </section>
  );
};
export default ImageViewBox;
