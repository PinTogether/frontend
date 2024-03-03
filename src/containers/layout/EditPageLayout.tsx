/**
 * ex )
 * <EditPageLayout>
 *    <Section>
        <SectionTitle>
          <EditIcon />
          닉네임 변경
        </SectionTitle>
        <input
          placeholder="김고양"
        />
        <span>닉네임 중복 확인</span>
      </Section>
      <Line />
      <Section>
        <button>완료</button>
      </Section>
    </EditPageLayout>
 * 
 */

"use client";

import styles from "@/styles/layout/_editPageLayout.module.scss";
import { HTMLAttributes, forwardRef } from "react";

interface EditPageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
const EditPageLayout = forwardRef<HTMLElement, EditPageLayoutProps>(
  ({ children, className }: EditPageLayoutProps, ref) => {
    return (
      <section ref={ref} className={`${styles.editPageLayout} ${className}`}>
        {children}
      </section>
    );
  }
);
export default EditPageLayout;

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}
export const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={`${styles.section} ${className}`}>{children}</section>
  );
};

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}
export const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return <h3 className={`${styles.sectionTitle} ${className}`}>{children}</h3>;
};

export const Line = () => {
  return <hr className={styles.line} />;
};
