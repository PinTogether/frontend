import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import PinCard from "../../components/PinCard";
import { PinForPlace } from "@/types/Pin";

export default function CollectionWithPinCommentRenderer({
  data,
}: {
  data: PinForPlace[];
}) {
  return (
    <section className={styles.collectionListContainer}>
      {data.map((pinComment) => (
        <PinCard key={pinComment.id} pinData={pinComment} />
      ))}
    </section>
  );
}
