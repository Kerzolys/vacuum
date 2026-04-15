import { useTranslation } from "react-i18next";
import styles from "./paragraph-ui.module.scss";
import type { ParagraphUIProps } from "./type";

export const ParagraphUI: React.FC<ParagraphUIProps> = ({ paragraph }) => {
  const { i18n } = useTranslation();

  const lang = i18n.language as "ru" | "en";

  return <p className={styles.paragraph}>{paragraph.paragraph[lang]}</p>;
};
