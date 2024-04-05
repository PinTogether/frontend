"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/report/_reportPage.module.scss";
import { Report } from "@/types/Report";
import InfoListLayout, {
  UlWrapper,
  LiWrapper,
} from "@/containers/layout/InfoListLayout";

import fetchGetReport from "@/utils/reports/fetchGetReport";

const ReportDetailsPage = () => {
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
      <UlWrapper categoryTitle="신고내역">
        {reportList.length <= 0 ? (
          <LiWrapper className={styles.statusMessage}>
            접수된 신고 내역이 없습니다
          </LiWrapper>
        ) : (
          <>
            {reportList.map((report) => (
              <LiWrapper key={report.id} className={styles.reportDetails}>
                <span className={styles.details}>
                  {report.targetMembername} 님의 {report.platformType} 에 대한
                  신고를 접수하였습니다.
                </span>
                <span className={styles.complaintCategory}>
                  카테고리 :{report.complaintCategory}
                </span>
                <span className={styles.reporter}>
                  신고자: {report.reporterMembername}
                </span>
                <span
                  className={styles.createdAt}
                >{`${report.createdAt}`}</span>
                <span className={styles.reason}>
                  사유: {`${report.reason}`}
                </span>
              </LiWrapper>
            ))}
          </>
        )}
      </UlWrapper>
    </InfoListLayout>
  );
};
export default ReportDetailsPage;
