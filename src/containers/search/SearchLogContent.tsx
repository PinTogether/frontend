import { CloseRoundIcon, SearchIcon } from "@/components/IconSvg";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import Link from "next/link";

function SearchLogContent({
  searchKeyword,
  searchCategory,
}: {
  searchKeyword: string;
  searchCategory: string;
}) {
  // if (searchKeyword.length >= 7) {
  //   searchKeyword = searchKeyword.substring(0, 7);
  //   searchKeyword = searchKeyword + "...";
  // }
  return (
    <Link
      href={`/search?keyword=${searchKeyword}`}
      className={styles.searchLog}
    >
      <SearchIcon className={styles.searchIcon} />
      <p className={styles.searchKeyword}>{searchKeyword}</p>
      {/* <p className={styles.searchCategory}>{searchCategory}</p> */}
      {/* <CloseRoundIcon className={styles.deleteIcon} /> */}
    </Link>
  );
}

export { SearchLogContent };
