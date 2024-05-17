import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import { PinForPlace } from "@/types/Pin";
import PinCard from "@/components/PinCard";

export default function PinsCommentRenderer({ pins }: { pins: PinForPlace[] }) {
  return (
    <section className={styles.collectionListContainer}>
      {pins.map((pin) => (
        <PinCard key={pin.id} pinData={pin} />
      ))}
    </section>
  );
}
