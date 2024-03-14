import ProfilePage from "@/containers/profile/ProfilePage";
import SubPageLayout from "@/containers/layout/SubPageLayout";

type PageParams = {
  id: number;
};

export default function Page({ params }: { params: PageParams }) {
  return <ProfilePage id={params.id} />;
}
