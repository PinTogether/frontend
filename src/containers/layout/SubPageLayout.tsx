import Topper from "@/components/SubTopper";
import { ReactNode } from "react";
import styles from "@/styles/layout/_subPageLayout.module.scss";

export default function SubPageLayout({
  children,
  topperMsg,
}: {
  children?: ReactNode;
  topperMsg: string;
}) {
  return (
    <section className={styles.subPageLayout}>
      <Topper msg={topperMsg} />
      <div className={styles.subPage}>{children}</div>
    </section>
  );
}
