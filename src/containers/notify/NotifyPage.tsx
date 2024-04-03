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
import fetchPostNotifictaions from "@/utils/members/fetchPostNotifications";

import { NotifyResponse } from "@/types/Notify";
import NotifyBox from "./NotifyBox";

export default function NotifyPage() {
  const dispatch = useDispatch();
  const [reportList, setReportList] = useState<Report[]>([]);

  const [notifications, setNotifications] = useState<NotifyResponse | null>(
    null
  );

  useEffect(() => {
    fetchReportList();
    fetchNotifications();
  }, []);

  const fetchReportList = async () => {
    const { reportList, errorMessage } = await fetchGetReport(0, 10);
    setReportList(reportList);
    if (errorMessage) {
      dispatch(addAlertMessage(errorMessage));
    }
  };

  const fetchNotifications = async () => {
    const { notifications, errorMessage } = await fetchPostNotifictaions();
    if (notifications) {
      setNotifications(notifications);
    } else {
      dispatch(addAlertMessage(errorMessage));
    }
  };

  return (
    <InfoListLayout>
      {/* <UlWrapper categoryTitle="공지">
        <LiWrapper>
          어쩌구 저쩌구 이유로 금일(수) 23:00 ~ 24:00 서비스가 원활하지 않을 수
          있으니 양해 부탁드립니다.
        </LiWrapper>
      </UlWrapper> */}
      {reportList.length > 0 && (
        <UlWrapper categoryTitle="신고 현황">
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
      )}
      {!notifications && (
        <UlWrapper categoryTitle="알림이 없습니다">{""}</UlWrapper>
      )}
      {notifications?.today && (
        <UlWrapper categoryTitle="오늘">
          {notifications.today.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.yesterday && (
        <UlWrapper categoryTitle="어제">
          {notifications.yesterday.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.aweekAgo && (
        <UlWrapper categoryTitle="일주일">
          {notifications.aweekAgo.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.withinAMonth && (
        <UlWrapper categoryTitle="한달">
          {notifications.withinAMonth.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
    </InfoListLayout>
  );
}
