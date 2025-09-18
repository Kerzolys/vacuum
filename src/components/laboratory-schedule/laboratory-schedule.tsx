import { lections } from "../../utils/lections";
import { LectorBlockUI } from "../ui/lector-block-ui/lector-block-ui";
import styles from "./laboratory-schedule.module.scss";

export const LaboratorySchedule = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__lectionsBlock}>
        <h2>Лекции:</h2>
        <div className={styles.container__lectionsBlock__lections}>
          {lections.map((l) => (
            <div
              className={styles.container__lectionsBlock__lections__lection}
              key={l.id}
            >
              <h4>{l.date}</h4>
              <h3>{l.title}</h3>
              <LectorBlockUI data={l.lector} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
