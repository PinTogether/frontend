"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
      {!notifications && (
        <UlWrapper categoryTitle="알림이 없습니다">{""}</UlWrapper>
      )}
      {notifications?.today.length && (
        <UlWrapper categoryTitle="오늘">
          {notifications.today.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.yesterday.length && (
        <UlWrapper categoryTitle="어제">
          {notifications.yesterday.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.aweekAgo.length && (
        <UlWrapper categoryTitle="일주일">
          {notifications.aweekAgo.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.withinAMonth.length && (
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
