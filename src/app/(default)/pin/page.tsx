import SubPageLayout from "@/containers/layout/SubPageLayout";
// import styles from "@/styles/containers/pin/_pin.module.scss";
import PinPage from "@/containers/pin/PinPage";

export default function Page() {
  return (
    <SubPageLayout topperMsg="핀 조회">
      <PinPage />
    </SubPageLayout>
  );
}
