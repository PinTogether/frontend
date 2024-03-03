import Topper from "@/components/SubTopper";
import { ReactNode, forwardRef } from "react";
import styles from "@/styles/layout/_subPageLayout.module.scss";

interface SubPageLayoutProps {
  children?: ReactNode;
  topperMsg: string;
  submitButton?: boolean;
}

const SubPageLayout = forwardRef<HTMLDivElement, SubPageLayoutProps>(
  ({ children, topperMsg }: SubPageLayoutProps, ref) => {
    return (
      <section className={styles.subPageLayout}>
        <Topper msg={topperMsg} />
        <div className={styles.subPage} ref={ref}>
          {children}
        </div>
      </section>
    );
  }
);
export default SubPageLayout;
