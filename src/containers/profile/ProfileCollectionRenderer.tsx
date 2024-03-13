import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import { DefaultCollectionCard } from "@/components/CollectionCard";

export default function ProfileCollectionRenderer({
  collectionList,
}: {
  collectionList: CollectionDetail[];
}) {
  return (
    <section className={styles.profileListContainer}>
      {collectionList.map((collection, index) => (
        <DefaultCollectionCard key={index} collectionData={collection} />
      ))}
    </section>
  );
}
