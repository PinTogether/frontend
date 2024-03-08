import { CloseRoundIcon, SearchIcon } from "@/components/IconSvg";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import Link from "next/link";

interface SearchData {
  searchString: string;
  searchCategory: number;
}

function SearchLog({
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

export { SearchLog };
