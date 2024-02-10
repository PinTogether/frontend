import Image from "next/image";
import styles from "@/styles/layout/_profileSettingPage.module.scss";
import Topper from "@/components/SubTopper";

export default function Page() {
  const size = 300;
  return (
    <section className={styles.container}>
      <Topper msg={"프로필 수정"} />
      <p className={styles.message}>
          프로필 사진 변경
      </p>
      <section className={styles.avartarChangeContainer}>
        <div>
        </div>
          <button>
            <Image
                src="/images/cat_dummy.jpeg"
                alt="profile image"
                className={styles.avartar}
                width={size}
                height={size}
              />
          </button>
        <div className={styles.cancelButtonBox}>
          <button className={styles.cancelButton}>
            X
          </button>
        </div>
      </section>
      <p className={styles.message}>
          닉네임 변경
      </p>
      <section className={styles.nicknameChangeContainer}>
        닉네임 변경내용
      </section>
      <section className={styles.buttonContainer}>
        버튼
      </section>
    </section>
  );
}
