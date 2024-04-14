import ProfileEditPage from "@/containers/profile/ProfileEditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <ProfileEditPage />;
}
