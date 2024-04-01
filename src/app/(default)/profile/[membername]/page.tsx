import ProfilePage from "@/containers/profile/ProfilePage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

type PageParams = {
  id?: number;
  membername?: string;
};

export default function Page({ params }: { params: PageParams }) {
  return <ProfilePage membername={params.membername || ""} />;
}
