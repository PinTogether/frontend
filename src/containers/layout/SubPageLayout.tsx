// import Topper from "@/components/SubTopper";
"use client";

import { ReactNode, forwardRef, useRef, useEffect, useState } from "react";
import styles from "@/styles/layout/_subPageLayout.module.scss";
import { ExpandLeftIcon, ExpendUpIcon } from "@/components/IconSvg";
import { useRouter } from "next/navigation";
import GlobalAlertModal from "@/components/GlobalAlertModal";

export { SubPageLayout };

interface SubPageLayoutProps {
  children?: ReactNode;
  topperMsg: string;
  completeButtonMsg?: string;
  onClickCompleteButton?: () => void;
}

const SubPageLayout = forwardRef<HTMLDivElement, SubPageLayoutProps>(
  (
    {
      children,
      topperMsg,
      completeButtonMsg,
      onClickCompleteButton,
    }: SubPageLayoutProps,
    ref
  ) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const [hasVerticalOverflow, setHasVerticalOverflow] = useState(false);

    const scrollTop = () => {
      console.log(pageRef.current);
      pageRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    useEffect(() => {
      if (pageRef.current) {
        const hasVerticalOverflow =
          pageRef.current.scrollHeight > pageRef.current.clientHeight;
        setHasVerticalOverflow(hasVerticalOverflow);
      }
    }, [pageRef.current?.clientHeight]);

    return (
      <section className={styles.subPageLayout}>
        <SubPageTopper
          msg={topperMsg}
          completeButtonMsg={completeButtonMsg}
          onClickCompleteButton={onClickCompleteButton}
        />
        <div className={styles.subPage} ref={pageRef}>
          {children}
        </div>
        {hasVerticalOverflow && (
          <button
            className={styles.scrollTopButton}
            onClick={() => {
              scrollTop();
            }}
          >
            <ExpendUpIcon />
          </button>
        )}
        <GlobalAlertModal />
      </section>
    );
  }
);
SubPageLayout.displayName = "SubPageLayout";
export default SubPageLayout;

const SubPageTopper = ({
  msg,
  completeButtonMsg,
  onClickCompleteButton,
}: {
  msg?: string;
  completeButtonMsg?: string;
  onClickCompleteButton?: () => void;
}) => {
  const router = useRouter();
  return (
    <section className={styles.topper}>
      <button onClick={() => router.back()}>
        {/* <ExpandLeftIcon /> */}
        <img
          src="/icon/expand_left.svg"
          alt="backward"
          className={styles.icon}
        />
      </button>
      <b>{msg}</b>
      <button
        onClick={onClickCompleteButton}
        className={completeButtonMsg ? styles.completeButton : styles.hidden}
      >
        {completeButtonMsg}
      </button>
    </section>
  );
};
