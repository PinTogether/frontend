import styles from "@/styles/layout/_sidebar.module.scss";
import Image from "next/image";

export default function Sidebar() {
  // Image 의 필수 요소 때문에 width, height 를 지정해 주었지만, 영향을 미치지 않습니다.
  const size = 300;
  return (
    <section className={styles.container}>
      <div></div>
      <button className={styles.button}>
        <Image
          src="/icon/home_plain.svg"
          alt="Home Icon"
          className={styles.icon}
          width={size}
          height={size}
        />
        <Image
          src="/icon/home_hovered.svg"
          alt="Home Icon Hovered"
          className={styles.hoveredIcon}
          width={size}
          height={size}
        />
      </button>
      <button className={styles.button}>
        <Image
          src="/icon/map_plain.svg"
          alt="map Icon"
          className={styles.icon}
          width={size}
          height={size}
        />
        <Image
          src="/icon/map_hovered.svg"
          alt="Map Icon Hovered"
          className={styles.hoveredIcon}
          width={size}
          height={size}
        />
      </button>
      <button className={styles.button}>
        <Image
          src="/icon/like_plain.svg"
          alt="like Icon"
          className={styles.icon}
          width={size}
          height={size}
        />
        <Image
          src="/icon/like_hovered.svg"
          alt="Like Icon Hovered"
          className={styles.hoveredIcon}
          width={size}
          height={size}
        />
      </button>
      <div></div>
      <button className={styles.button}>
        <Image
          src="/icon/bell_plain.svg"
          alt="bell Icon"
          className={styles.icon}
          width={size}
          height={size}
        />
        <Image
          src="/icon/bell_hovered.svg"
          alt="Bell Icon Hovered"
          className={styles.hoveredIcon}
          width={size}
          height={size}
        />
      </button>
      <button className={styles.button}>
        <div className={styles.profilebox}>
          <Image
            src="/images/cat_dummy.jpeg"
            alt="profile image"
            className={styles.profile}
            width={size}
            height={size}
          />
        </div>
      </button>
      <div></div>
    </section>
  );
}
