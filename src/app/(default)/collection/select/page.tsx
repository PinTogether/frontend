import CollectionSelectPage from "@/containers/collection/CollectionSelectPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <CollectionSelectPage />;
}
