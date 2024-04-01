"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import { Report } from "@/types/Report";
import InfoListLayout, {
  UlWrapper,
  LiWrapper,
} from "@/containers/layout/InfoListLayout";
import fetchGetReport from "@/utils/reports/fetchGetReport";
import { Line } from "../layout/EditPageLayout";

export default function NotifyPage() {
  const dispatch = useDispatch();
  const [reportList, setReportList] = useState<Report[]>([]);

  useEffect(() => {
    fetchReportList();
  }, []);

  const fetchReportList = async () => {
    const { reportList, errorMessage } = await fetchGetReport(0, 10);
    setReportList(reportList);
    if (errorMessage) {
      dispatch(addAlertMessage(errorMessage));
    }
  };

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="공지">
        <LiWrapper>
          어쩌구 저쩌구 이유로 금일(수) 23:00 ~ 24:00 서비스가 원활하지 않을 수
          있으니 양해 부탁드립니다.
        </LiWrapper>
      </UlWrapper>
      <UlWrapper categoryTitle="신고">
        {reportList.map((report) => (
          <LiWrapper key={report.id}>
            <span>
              {report.targetMembername} 님의 {report.platformType} 에 대한
              신고를 접수하였습니다.
            </span>
            <span>
              {report.complaintCategory} 사유: {report.reason}
            </span>
            <span>
              {report.createdAt} 신고자: {report.reporterMembername}
            </span>
          </LiWrapper>
        ))}
      </UlWrapper>
      <UlWrapper categoryTitle="알림">
        <LiWrapper>
          잠자는_짱구의_콧털 님이 내 맛집 컬렉션 을 스크랩 하였습니다.
        </LiWrapper>
        <LiWrapper>
          잠자는_짱구의_콧털 님이 내 맛집 컬렉션에 댓글을 달았습니다.
        </LiWrapper>
        <LiWrapper>
          잠자는_짱구의_콧털 님이 내 맛집 컬렉션에 좋아요를 눌렀습니다.
        </LiWrapper>
        <LiWrapper>
          잠자는_짱구의_콧털 님이 나(지우개)를 팔로우 하였습니다.
        </LiWrapper>
        <LiWrapper>
          잠자는_짱구의_콧털 님이 새 컬렉션 잠자는_짱구의_콧털 (을)를
          만들었습니다.
        </LiWrapper>
        <LiWrapper>
          강릉_주민_맛집 컬렉션에 단 댓글이 “~” 사유로 삭제되었습니다.
        </LiWrapper>
      </UlWrapper>
    </InfoListLayout>
  );
}
