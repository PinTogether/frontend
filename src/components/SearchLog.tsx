import styles from "@/styles/layout/_searchPage.module.scss"

interface SearchData{
  searchString: string,
  searchCategory: number,
}

function SearchLog({ searchString, searchCategory }: { searchString: string; searchCategory: string }) {
  if(searchString.length >= 7)
  {
    searchString = searchString.substring(0, 7);
    searchString = searchString + "...";
  }
  return(
    <button>
      <div className={styles.searchLog}>
        <p>{searchString}</p>
        <p className={styles.searchCategory}>{searchCategory}</p>
      </div>
    </button>
  );
}

export {SearchLog};
