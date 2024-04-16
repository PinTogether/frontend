import PinEditPage from "@/containers/pin/PinEditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <PinEditPage />;
}
