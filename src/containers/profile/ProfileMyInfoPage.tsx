"use client";

import InfoListLayout, { UlWrapper, LiWrapper } from "../layout/InfoListLayout";

export default function ProfileMyInfoPage() {
  const onClick = () => {};

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="계정관리">
        <LiWrapper onClick={onClick}>회원 탈퇴</LiWrapper>
      </UlWrapper>
    </InfoListLayout>
  );
}
