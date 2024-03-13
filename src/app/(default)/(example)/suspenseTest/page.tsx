import {
  AvatarImageSkeleton,
  DefaultCollectionSkeleton,
  CollectionImageSkeleton,
  PinWithReviewSkeleton,
} from "@/components/loading/SkeletonImage";
import styles from "@/styles/components/_skeletonImage.module.scss";
import { Suspense } from "react";

async function SlowServerComponent() {
  const got = await fetch("http://localhost:3000/api/suspense", {
    cache: "no-store",
  }).then((res) => (res.ok ? res.json() : { message: "GET failed" }));
  return <div>로딩 완료: {got.message}</div>;
}

export default function Page() {
  return (
    <div
      style={{
        padding: "20px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      아바타
      <div className={styles.previewContainer}>
        <AvatarImageSkeleton />
        <Suspense fallback={<AvatarImageSkeleton />}>
          <SlowServerComponent />
        </Suspense>
      </div>
      이미지
      <div className={styles.previewContainer}>
        <CollectionImageSkeleton />
        <Suspense fallback={<CollectionImageSkeleton />}>
          <SlowServerComponent />
        </Suspense>
      </div>
      컬렉션
      <div className={styles.previewContainer}>
        <DefaultCollectionSkeleton />
        <Suspense fallback={<DefaultCollectionSkeleton />}>
          <SlowServerComponent />
        </Suspense>
      </div>
      핀리뷰
      <PinWithReviewSkeleton />
      <Suspense fallback={<PinWithReviewSkeleton />}>
          <SlowServerComponent />
        </Suspense>
    </div>
  );
}
