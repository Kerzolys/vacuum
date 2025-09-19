import { Link } from "@mui/material";
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
              <h4>
                {l.date} | {l.time}
              </h4>
              <h4>{l.venue}</h4>
              <h3>{l.title}</h3>
              <LectorBlockUI data={l.lector} />
              <Link
                target="_blank"
                href={l.registration_link}
                underline="none"
                className={
                  styles.container__lectionsBlock__lections__lection__link
                }
              >
                Зарегистрироваться
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
