import {
  AvatarImageSkeleton,
  DefaultCollectionSkeleton,
  CollectionImageSkeleton,
  PinWithReviewSkeleton,
  DetailCollectionSkeleton,
  SimpleCollectionSkeleton,
  SimplePinSkeleton,
} from "@/components/loading/SkeletonImage";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";
import styles from "@/styles/components/_skeletonImage.module.scss";
import { Suspense } from "react";

async function SlowServerComponent({ time }: { time: number }) {
  const got = await fetch(`http://localhost:3000/api/suspense?time=${time}`, {
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
          <SlowServerComponent time={5000} />
        </Suspense>
      </div>
      이미지
      <div className={styles.previewContainer}>
        <CollectionImageSkeleton />
        <Suspense fallback={<CollectionImageSkeleton />}>
          <SlowServerComponent time={3000} />
        </Suspense>
      </div>
      컬렉션
      <div className={styles.previewContainer}>
        <DefaultCollectionSkeleton />
        <Suspense fallback={<DefaultCollectionSkeleton />}>
          <SlowServerComponent time={2000} />
        </Suspense>
      </div>
      핀리뷰
      <PinWithReviewSkeleton />
      <Suspense fallback={<PinWithReviewSkeleton />}>
        <SlowServerComponent time={8000} />
      </Suspense>
      디테일 컬렉션
      <DetailCollectionSkeleton />
      심플 컬렉션
      <SimpleCollectionSkeleton />
      심플 핀
      <SimplePinSkeleton />
      프로필
      <ProfileSkeleton />
    </div>
  );
}
