import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import SubPageLayout from "@/containers/layout/SubPageLayout";

export default function CollectionNotFoundPage({
  collectionInfoErrMsg,
}: {
  collectionInfoErrMsg: string;
}) {
  return (
    <SubPageLayout topperMsg={"컬렉션 조회"}>
      <p className={styles.errorMessage}>{collectionInfoErrMsg}</p>
    </SubPageLayout>
  );
}
