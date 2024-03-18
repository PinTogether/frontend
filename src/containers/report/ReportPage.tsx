"use client";

import SubPageLayout from "../layout/SubPageLayout";
import { FlashIcon } from "@/components/IconSvg";
import { InputComponent, TextareaComponent } from "@/components/InputComponent";
import EditPageLayout, {
  SectionTitle,
  Line,
  Section,
} from "@/containers/layout/EditPageLayout";

export default function ReportPage() {
  const type = "유저"; // "컬렉션" "핀" "댓글"
  const name = "잠자는 짱구의 콧털";

  const submitReport = () => {};

  return (
    <SubPageLayout
      topperMsg="신고"
      completeButtonMsg="완료"
      onClickCompleteButton={submitReport}
    >
      <EditPageLayout>
        <Section>
          <SectionTitle>
            <FlashIcon />
            신고 내용
          </SectionTitle>
          <ul>
            <li>
              <span>{type}</span>
              <span>{name}</span>
            </li>
            <li>
              <span>내용</span>
              <span></span>
            </li>
          </ul>
        </Section>
        <Line />
        <Section>
          <SectionTitle>
            <FlashIcon />
            사유 선택
          </SectionTitle>
        </Section>
        <Line />
        <Section>
          <SectionTitle>
            <FlashIcon />
            상세 사유
          </SectionTitle>
          <TextareaComponent rows={5} maxLength={500} />
        </Section>
        <Line />
      </EditPageLayout>
    </SubPageLayout>
  );
}
