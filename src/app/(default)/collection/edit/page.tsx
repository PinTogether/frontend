import CollectionEditPage from "@/containers/collection/CollectionEditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <CollectionEditPage topperMsg="컬렉션 생성" />;
}
