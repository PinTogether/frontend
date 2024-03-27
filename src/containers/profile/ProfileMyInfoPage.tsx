"use client";

import { useState } from "react";
import InfoListLayout, { UlWrapper, LiWrapper } from "../layout/InfoListLayout";
import fetchDeleteAccount from "@/utils/fetchDeleteAccount";
import AlertModal from "@/components/AlertModal";
import { useLogout } from "@/hooks/useLogout";

export default function ProfileMyInfoPage() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const logout = useLogout();

  const handleClickDeleteAccount = async () => {
    const confirmMessage = "정말로 탈퇴하시겠습니까? 😔";
    if (confirm(confirmMessage)) {
      const { success, errorMessage } = await fetchDeleteAccount();
      // TODO : logout 로직 추가
      if (success) {
        alert("탈퇴되었습니다.");
        logout();
        location.href = "/";
      } else {
        setAlertMessage(errorMessage);
      }
    }
  };

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="계정관리">
        <LiWrapper onClick={handleClickDeleteAccount}>회원 탈퇴</LiWrapper>
      </UlWrapper>
      <AlertModal message={alertMessage} setMessage={setAlertMessage} />
    </InfoListLayout>
  );
}
