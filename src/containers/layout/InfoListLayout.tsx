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

interface LiWrapperProps extends React.HTMLProps<HTMLLIElement> {
  showExpandButton?: boolean; // showExpandButton을 boolean으로 명시적으로 선언
  onClick?: React.MouseEventHandler<HTMLLIElement>; // onClick은 선택적이며, HTMLLIElement에 대한 마우스 이벤트 핸들러입니다.
}
export const LiWrapper = ({
  children,
  showExpandButton = false,
  onClick,
  ...props
}: LiWrapperProps) => {
  return (
    <li
      className={onClick ? styles.clickableList : styles.list}
      onClick={onClick}
      {...props}
    >
      {children}
      {showExpandButton ? (
        <ExpandRightIcon className={styles.expandButton} />
      ) : null}
    </li>
  );
};
