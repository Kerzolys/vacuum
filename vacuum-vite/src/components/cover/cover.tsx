import coverimage from "../../assets/images/coverimage-5.png";

import styles from "./cover.module.scss";

export const Cover = () => {
  return (
    <main className={styles.cover}>
      <img
        className={styles.cover__image}
        src={coverimage}
        alt="Vacuum Quartet"
      />
    </main>
  );
};
