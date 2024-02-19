/* ex)
<InfoListLayout>
  <UlWrapper categoryTitle="카테고리1">
    <LiWrapper>리스트1</LiWrapper>
    <LiWrapper>리스트2</LiWrapper>
    <LiWrapper>리스트3</LiWrapper>
  </UlWrapper>
  <UlWrapper categoryTitle="카테고리2">
    <LiWrapper>리스트1</LiWrapper>
    <LiWrapper>리스트2</LiWrapper>
    <LiWrapper>리스트3</LiWrapper>
  </UlWrapper>
</InfoListLayout>
*/

"use client";

import { ExpandRightIcon } from "../../components/IconSvg";
import styles from "@/styles/layout/_infoListLayout.module.scss";

export default function InfoListLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <section className={styles.infoListLayout}>{children}</section>;
}

export const UlWrapper = ({
  children,
  categoryTitle,
}: {
  children: React.ReactNode;
  categoryTitle: string;
}) => {
  return (
    <ul>
      <h3 className={styles.categoryTitle}>{categoryTitle}</h3>
      {children}
    </ul>
  );
};

export const LiWrapper = ({
  children,
  onClick,
  ...props
}: React.HTMLProps<HTMLLIElement>) => {
  return (
    <li
      className={onClick ? styles.clickableList : styles.list}
      onClick={onClick}
      {...props}
    >
      {children}
      {onClick ? <ExpandRightIcon className={styles.expandButton} /> : null}
    </li>
  );
};
