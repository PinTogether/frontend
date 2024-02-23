import ProfilePage from "@/containers/profile/ProfilePage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

type PageParams ={
  id: number;
}

export default function Page({params}:{params:PageParams}) {
  return (
    <SubPageLayout topperMsg="프로필">
      <ProfilePage id={params.id} />
    </SubPageLayout>
  );
}
