import styles from "@/styles/containers/profile/_profilePage.module.scss";
import Collection, { CollectionDetail } from "@/types/Collection";
import CollectionCard from "@/components/CollectionCard";

export default function ProfileCollectionRenderer({
  collectionList,
}: {
  collectionList: CollectionDetail[];
}) {
  return (
    <section className={styles.profileListContainer}>
      {collectionList.map((collection, index) => (
        <CollectionCard key={index} collectionData={collection} />
      ))}
    </section>
  );
}
