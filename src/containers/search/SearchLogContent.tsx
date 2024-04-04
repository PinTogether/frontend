import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import { CloseRoundIcon, SearchIcon } from "@/components/IconSvg";

import fetchDeleteSearchHistory from "@/utils/search/fetchDeleteSearchHistory";

function SearchLogContent({
  id,
  searchKeyword,
  searchCategory,
  deleteSearchLog,
}: {
  id: number;
  searchKeyword: string;
  searchCategory: string;
  deleteSearchLog: (id: number) => void;
}) {
  const dispatch = useAppDispatch();

  const handleDeleteSearchLog = async () => {
    const { success, errorMessage } = await fetchDeleteSearchHistory(id);
    if (!success) {
      dispatch(addAlertMessage(errorMessage));
    } else {
      deleteSearchLog(id);
    }
  };

  return (
    <div className={styles.searchLogContent}>
      <Link
        href={`/search?keyword=${encodeURIComponent(searchKeyword)}`}
        className={styles.searchLog}
      >
        <SearchIcon className={styles.searchIcon} />
        <p className={styles.searchKeyword}>{searchKeyword}</p>
        {/* <p className={styles.searchCategory}>{searchCategory}</p> */}
        {/* <CloseRoundIcon className={styles.deleteIcon} /> */}
      </Link>
      <CloseRoundIcon
        className={styles.deleteIcon}
        onClick={handleDeleteSearchLog}
      />
    </div>
  );
}

export { SearchLogContent };
