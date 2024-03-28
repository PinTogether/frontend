import FollowPage from "@/containers/profile/FollowPage";

type PageParams = {
  id: number;
};

export default function Page({ params }: { params: PageParams }) {
  return <FollowPage userId={params.id} />;
}
