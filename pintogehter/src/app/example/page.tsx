import styles from "@/styles/containers/_examples.module.scss";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Page</h1>
      <button>button</button>
      <input placeholder="input" />
	  <textarea placeholder="textarea" />
    </div>
  );
}
