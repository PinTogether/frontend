import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { DefaultCollectionCard } from "@/components/CollectionCard";

export default function ProfileCollectionRenderer({
  collectionList,
  className,
}: {
  collectionList: CollectionDetail[];
  className?: string;
}) {
  return (
    <section className={`${styles.profileListContainer} ${className}`}>
      {collectionList.map((collection, index) => (
        <DefaultCollectionCard key={index} collectionData={collection} />
      ))}
    </section>
  );
}
