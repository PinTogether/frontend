import styles from "@/styles/components/_collectioncard.module.scss";
import Image from "next/image";
import { LinkIcon } from "@/components/Icons";

export interface ICollection {
  // tmp
  name: string;
  description: string;
}

export default function CollectionCard({
  collectionData,
  horizontal = false,
  simple = false,
}: {
  collectionData: ICollection;
  horizontal?: boolean;
  simple?: boolean;
}) {
  return simple ? (
    <SimpleCollectionCard collectionData={collectionData} />
  ) : horizontal ? (
    <HorizontalCollectionCard collectionData={collectionData} />
  ) : (
    <DefaultCollectionCard collectionData={collectionData} />
  );
}

const DefaultCollectionCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.collectionCard}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/cat_dummy.jpeg"
          alt="user profile image"
          width={200}
          height={200}
          className={styles.userAvatar}
        />
      </div>
      <div className={styles.textContainer}>
        <Image
          src="/images/cat_dummy.jpeg"
          alt="user profile image"
          width={100}
          height={100}
          className={styles.userAvatar}
        />
        <p>by 짱구_콧털</p>
        <h2>강릉 주민 맛집</h2>
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <LinkIcon />
          <p>24개 장소</p>
        </button>
        <button>
          <LinkIcon />
          <p>공유하기</p>
        </button>
      </div>
    </article>
  );
};

const SimpleCollectionCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.simpleCollectionCard}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/cat_dummy.jpeg"
          alt="user profile image"
          width={200}
          height={200}
          className={styles.userAvatar}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>강릉 주민 맛집</h2>
      </div>
    </article>
  );
};

const HorizontalCollectionCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.horizontalCollectionCard}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/cat_dummy.jpeg"
          alt="user profile image"
          width={200}
          height={200}
          className={styles.userAvatar}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>강릉 주민 맛집</h2>
        <p>by 짱구_콧털</p>
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <LinkIcon />
          <p>24개 장소</p>
        </button>
        <button>
          <LinkIcon />
          <p>공유하기</p>
        </button>
      </div>
    </article>
  );
};
