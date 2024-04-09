"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import InfoListLayout, {
  UlWrapper,
  LiWrapper,
} from "@/containers/layout/InfoListLayout";

import fetchPostNotifictaions from "@/utils/members/fetchPostNotifications";

import { NotifyResponse } from "@/types/Notify";
import NotifyBox from "./NotifyBox";

export default function NotifyPage() {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState<NotifyResponse | null>(
    null
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

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
        <LiWrapper>현재 Beta 버전 운영 중 입니다.</LiWrapper>
      </UlWrapper> */}
      {!notifications && (
        <UlWrapper categoryTitle="알림이 없습니다">{""}</UlWrapper>
      )}
      {notifications?.today && notifications.today.length > 0 && (
        <UlWrapper categoryTitle="오늘">
          {notifications.today.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.yesterday && notifications.yesterday.length > 0 && (
        <UlWrapper categoryTitle="어제">
          {notifications.yesterday.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.aweekAgo && notifications?.aweekAgo.length > 0 && (
        <UlWrapper categoryTitle="일주일">
          {notifications.aweekAgo.map((notify, idx) => (
            <LiWrapper key={idx}>
              <NotifyBox data={notify} />
            </LiWrapper>
          ))}
        </UlWrapper>
      )}
      {notifications?.withinAMonth &&
        notifications?.withinAMonth.length > 0 && (
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
