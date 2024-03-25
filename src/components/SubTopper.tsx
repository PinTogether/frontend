"use client";

import styles from "@/styles/components/_subtopper.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Topper = ({ msg }: { msg?: string }) => {
  const router = useRouter();
  return (
    <section className={styles.topper}>
      <button onClick={() => router.back()}>
        <Image
          src="/icon/expand_left.svg"
          alt="backward"
          className={styles.icon}
        />
      </button>
      <b>{msg}</b>
      {/* <button>완료</button> */}
    </section>
  );
};

export default Topper;
