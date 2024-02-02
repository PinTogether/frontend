import styles from "@/styles/layout/_sidebar.module.scss";
import Image from "next/image";

export default function Sidebar() {
  return (
    <section className={styles.container}>
      <div></div>
      <button className={styles.button}>
        <Image
          src="/icon/home_plain.svg"
          alt="Home Icon"
          className={styles.icon}
        />
        <Image
          src="/icon/home_hovered.svg"
          alt="Home Icon Hovered"
          className={styles.hoveredIcon}
        />
      </button>
      <button className={styles.button}>
        <Image
          src="/icon/map_plain.svg"
          alt="map Icon"
          className={styles.icon}
        />
        <Image
          src="/icon/map_hovered.svg"
          alt="Map Icon Hovered"
          className={styles.hoveredIcon}
        />
      </button>
      <button className={styles.button}>
        <Image
          src="/icon/like_plain.svg"
          alt="like Icon"
          className={styles.icon}
        />
        <Image
          src="/icon/like_hovered.svg"
          alt="Like Icon Hovered"
          className={styles.hoveredIcon}
        />
      </button>
      <div></div>
      <button className={styles.button}>
        <Image
          src="/icon/bell_plain.svg"
          alt="bell Icon"
          className={styles.icon}
        />
        <Image
          src="/icon/bell_hovered.svg"
          alt="Bell Icon Hovered"
          className={styles.hoveredIcon}
        />
      </button>
      <button className={styles.button}>
        <div className={styles.profilebox}>
          <Image
            src="/images/cat_dummy.jpeg"
            alt="profile image"
            className={styles.profile}
          />
        </div>
      </button>
      <div></div>
    </section>
  );
}
