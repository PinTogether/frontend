"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/report/_reportPage.module.scss";
import { PlatformType, ComplaintCategory } from "@/types/Report";
import SubPageLayout from "../layout/SubPageLayout";
import { FlashIcon } from "@/components/IconSvg";
import { TextareaComponent } from "@/components/InputComponent";
import EditPageLayout, {
  SectionTitle,
  Line,
  Section,
} from "@/containers/layout/EditPageLayout";
import fetchPostReport from "@/utils/reports/fetchPostReport";

// 신고창구에서 사유선택은 eunm타입으로 하는 것이 좋겠음
// 스팸홍보/도배글: Spam Promotion/Flooding or Spam Posting
// 음란물: Pornography
// 불법정보 포함: Illegal Information Included
// 청소년에게 유해한 내용: Content Harmful to Minors
// 욕설/생명경시/혐오/차별적 표현: Profanity/Disregard for Life/Hate Speech/Discriminatory Language
// 개인정보 노출 게시물: Posts Exposing Personal Information
// 불쾌한 표현: Offensive Language

const optionCategory = [
  {
    type: ComplaintCategory.SPAM,
    text: "스팸홍보",
  },
  {
    type: ComplaintCategory.FLOODING,
    text: "도배글",
  },
  {
    type: ComplaintCategory.PORNO,
    text: "음란물",
  },
  {
    type: ComplaintCategory.ILLEGAL,
    text: "불법정보 포함",
  },
  {
    type: ComplaintCategory.HARMFUL_TO_MINORS,
    text: "청소년에게 유해한 내용:",
  },
  {
    type: ComplaintCategory.DISCRIMINATORY,
    text: "욕설/생명경시/혐오/차별적 표현",
  },
  {
    type: ComplaintCategory.PERSONAL_INFORMATION,
    text: "개인정보 노출 게시물",
  },
];

export default function ReportPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [reportType, setReportType] = useState<PlatformType | null>(null);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory>(
    optionCategory[0].type
  );
  const reasonTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const isVaildReportType = (value: any): value is PlatformType => {
      return Object.values(PlatformType).includes(value);
    };

    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (isVaildReportType(type)) setReportType(type);
    if (id) setTargetId(Number(id));
  }, []);

  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isValidComplaintCategory = (
      value: any
    ): value is ComplaintCategory => {
      return Object.values(ComplaintCategory).includes(value);
    };

    if (isValidComplaintCategory(e.target.value)) {
      setSelectedCategory(e.target.value);
    }
  };

  const submitReport = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!reportType || !targetId) {
      dispatch(addAlertMessage("신고할 수 없는 대상입니다."));
      return;
    }
    if (!selectedCategory) {
      dispatch(addAlertMessage("사유를 선택해주세요."));
      return;
    }
    const reason = reasonTextareaRef.current?.value;
    if (!reason) {
      dispatch(addAlertMessage("사유를 작성해주세요."));
      return;
    }

    const res = await fetchPostReport(
      reportType,
      selectedCategory,
      reason,
      targetId
    );

    if (res.success) {
      dispatch(addAlertMessage("신고가 완료되었습니다."));
    } else {
      dispatch(addAlertMessage(res.errorMessage));
    }
    setIsLoading(false);
  };

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
          <div className={styles.box}>
            <div className={styles.title}>{"타입 : "}</div>
            <div className={styles.fixed}>
              {reportType === PlatformType.COLLECTION
                ? "컬렉션"
                : reportType === PlatformType.PIN
                  ? "핀"
                  : "댓글"}
            </div>
          </div>
        </Section>
        <Line />
        <Section>
          <SectionTitle>
            <FlashIcon />
            <legend>사유 선택</legend>
          </SectionTitle>
          <select
            className={styles.select}
            name="complaint-category"
            id="complaint-category-select"
            onChange={handleSelected}
            value={selectedCategory}
          >
            {optionCategory.map((category, idx) => (
              <option key={idx} value={category.type}>
                {category.text}
              </option>
            ))}
          </select>
        </Section>
        <Line />
        <Section>
          <SectionTitle>
            <FlashIcon />
            상세 사유
          </SectionTitle>
          <TextareaComponent rows={5} maxLength={500} ref={reasonTextareaRef} />
        </Section>
        <Line />
      </EditPageLayout>
    </SubPageLayout>
  );
}
