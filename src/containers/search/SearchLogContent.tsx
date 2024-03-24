import { CloseRoundIcon, SearchIcon } from "@/components/IconSvg";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import Link from "next/link";

function SearchLogContent({
  searchString,
  searchCategory,
}: {
  searchString: string;
  searchCategory: string;
}) {
  // if (searchString.length >= 7) {
  //   searchString = searchString.substring(0, 7);
  //   searchString = searchString + "...";
  // }
  return (
    <Link
      href={`/search?searchString=${searchString}`}
      className={styles.searchLog}
    >
      <SearchIcon className={styles.searchIcon} />
      <p className={styles.searchString}>{searchString}</p>
      {/* <p className={styles.searchCategory}>{searchCategory}</p> */}
      {/* <CloseRoundIcon className={styles.deleteIcon} /> */}
    </Link>
  );
}

export { SearchLogContent };
