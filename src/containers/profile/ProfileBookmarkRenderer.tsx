import { PlaceStarred } from "@/types/Place";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { PinIcon } from "@/components/IconSvg";

export default function ProfileBookmarkRenderer({
  bookmarks,
}: {
  bookmarks: PlaceStarred[];
}) {
  return (
    <section className={styles.profileBookmarkContainer}>
      {bookmarks.map((bookmark, index) => (
        <section key={index} className={styles.bookmarkContainer}>
          <PinIcon style={{ width: "25px", height: "25px" }} />
          <section className={styles.bookmarkData}>
            <b>{bookmark.name}</b>
            <div>{bookmark.category}</div>
            <div>{bookmark.address}</div>
          </section>
        </section>
      ))}
    </section>
  );
}
