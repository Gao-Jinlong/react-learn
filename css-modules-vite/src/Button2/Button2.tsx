import styles from "./index.module.scss";

export default function Button2() {
  return (
    <div className={styles["btnWrapper"]}>
      <button className={styles.btn}>button2</button>
    </div>
  );
}
