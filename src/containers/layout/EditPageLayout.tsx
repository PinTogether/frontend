/**
 * ex )
 * <EditPageLayout>
 *    <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          닉네임 변경
        </H3Wrapper>
        <input
          placeholder="김고양"
        />
        <span>닉네임 중복 확인</span>
      </SectionWrapper>
      <Line />
      <SectionWrapper>
        <button>완료</button>
      </SectionWrapper>
    </EditPageLayout>
 * 
 */

"use client";

import styles from "@/styles/layout/_editPageLayout.module.scss";

export default function EditPageLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <section className={styles.editPageLayout}>{children}</section>;
}

export const H3Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className={styles.h3Wrapper}>{children}</h3>;
};

export const SectionWrapper = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`${styles.sectionWrapper} ${className}`}>
      {children}
    </section>
  );
};

export const Line = () => {
  return <hr className={styles.line} />;
};
