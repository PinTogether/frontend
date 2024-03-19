"use client";

import InfoListLayout, { UlWrapper, LiWrapper } from "../layout/InfoListLayout";
import fetchDeleteAccount from "@/utils/fetchDeleteAccount";

export default function ProfileMyInfoPage() {
  const handleClickDeleteAccount = async () => {
    const confirmMessage = "정말로 탈퇴하시겠습니까? 😔";
    if (confirm(confirmMessage)) {
      const { success, errorMessage } = await fetchDeleteAccount();
      // TODO : logout 로직 추가
      if (success) {
        alert("탈퇴되었습니다.");
        location.href = "/";
      }
    }
  };

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="계정관리">
        <LiWrapper onClick={handleClickDeleteAccount}>회원 탈퇴</LiWrapper>
      </UlWrapper>
    </InfoListLayout>
  );
}
