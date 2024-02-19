import styles from "@/styles/containers/profile/_profilePage.module.scss";
import ICollection from "@/types/ICollection";
import CollectionCard from "@/components/CollectionCard";

export default function ProfileCollectionRenderer({collectionList}:{collectionList:ICollection[]}){
  return(
    <section className={styles.profileListContainer}>
            {collectionList.map((collection, index) => (
          <CollectionCard key={index} collectionData={collection} />
      ))}
  </section>
  );
}
